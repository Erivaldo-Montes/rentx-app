import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { api } from "../services/api";
import { database } from "../database";
import { User as UserModel } from "../database/models/user";
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
}

interface AuthProviderProps {
  children: ReactNode;
}

const authContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      const { token, user } = response.data;
      api.defaults.headers.authorization = `Bearer ${token}`;

      await database.write(async () => {
        const userCreated = await database
          .get<UserModel>("users")
          .create((newUser) => {
            (newUser.user_id = user.id),
              (newUser.name = user.name),
              (newUser.email = user.email),
              (newUser.driver_license = user.driver_license),
              (newUser.avatar = user.avatar),
              (newUser.token = token);
          });

        const userRaw = userCreated._raw as unknown as User;
        setData({ ...userRaw, token });
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async function logOut() {
    try {
      database.write(async () =>
        (await database.get("users").find(data.id)).destroyPermanently()
      );
      setData({} as User);
    } catch (error) {
      throw new Error(error);
    }
  }

  async function updateUser(user: User) {
    try {
      await database.write(async () => {
        const userData = await database.get<UserModel>("users").find(user.id);
        const userUpdated = await userData.update(() => {
          (userData.name = user.name),
            (userData.driver_license = user.driver_license),
            (userData.avatar = user.avatar);
        });

        setData(userUpdated);
      });
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
        setData(userData);
      }
    }

    loadUserData();
  }, []);

  return (
    <authContext.Provider value={{ signIn, logOut, updateUser, user: data }}>
      {children}
    </authContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(authContext);

  return context;
}

export { useAuth, AuthProvider };
