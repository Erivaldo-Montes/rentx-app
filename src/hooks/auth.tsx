import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import NetInfo from "@react-native-community/netinfo";
import { api } from "../services/api";
import { database } from "../database";
import { User, User as UserModel } from "../database/models/user";
interface User {
  id: string;
  user_id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  logOut: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  loading: boolean;
  isConnected: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const authContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState<boolean>(null);

  NetInfo.fetch().then((state) => {
    console.log("net,", state.isConnected);
    setIsConnected(state.isInternetReachable);
  });

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      const { token, user } = response.data;
      api.defaults.headers.authorization = `Bearer ${token}`;

      const userCollection = database.get<UserModel>("users");
      await database.action(async () => {
        await userCollection.create((newUser) => {
          (newUser.user_id = user.id),
            (newUser.name = user.name),
            (newUser.email = user.email),
            (newUser.driver_license = user.driver_license),
            (newUser.avatar = user.avatar),
            (newUser.token = token);
        });
      });

      setData({ ...user, token });
    } catch (error) {
      throw new Error(error);
    }
  }

  async function logOut() {
    try {
      const userCollection = database.get<UserModel>("users");
      await database.action(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      });

      setData({} as User);
    } catch (error) {
      throw new Error(error);
    }
  }

  async function updateUser(user: User) {
    try {
      const userCollection = database.get<UserModel>("users");
      await database.action(async () => {
        const userSelected = await userCollection.find(user.id);
        await userSelected.update((userData) => {
          (userData.name = user.name),
            (userData.driver_license = user.driver_license),
            (userData.avatar = user.avatar);
        });
      });

      setData(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<UserModel>("users");
      const response = await userCollection.query().fetch();
      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User;
        api.defaults.headers.authorization = `Bearer ${userData.token}`;
        setLoading(false);
        setData(userData);
      }
    }

    loadUserData();
  }, []);

  return (
    <authContext.Provider
      value={{ signIn, logOut, updateUser, loading, user: data, isConnected }}
    >
      {children}
    </authContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(authContext);

  return context;
}

export { useAuth, AuthProvider };
