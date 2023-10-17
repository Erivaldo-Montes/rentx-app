import React, {
  useCallback,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import { Alert, StatusBar, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../../database";
import { Car as CarModel } from "../../database/models/car";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

import { Button } from "../../components/Button";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);
import { sync } from "../../services/sync";
import { Ionicons } from "@expo/vector-icons";
import { api } from "../../services/api";
import Logo from "../../assets/logo.svg";
import { LoadAnimation } from "../../components/LoadAnimation";
import { Car } from "../../components/Car";
import { Load } from "../../components/Load";
import { CarDTO } from "../../dtos/carsDTO";
import { useTheme } from "styled-components";
import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";
import { useAuth } from "../../hooks/auth";

export function Home() {
  const [cars, setCars] = useState<CarModel[]>([]);

  const [loading, setLoading] = useState(true);
  const { isConnected } = useAuth();

  // const positionX = useSharedValue(0);
  // const positionY = useSharedValue(0);
  // const onGestureEvent = useAnimatedGestureHandler({
  //   onStart(_, ctx: any) {
  //     // armazena a posição do botão
  //     ctx.positionX = positionX.value;
  //     ctx.positionY = positionY.value;
  //   },
  //   onActive(event, ctx: any) {
  //     positionX.value = ctx.positionX + event.translationX;
  //     positionY.value = ctx.positionY + event.translationY;
  //   },
  //   onEnd() {
  //     positionX.value = withSpring(0);
  //     positionY.value = withSpring(0);
  //   },
  // });
  // estilos do botão flutuante
  // const myCarsAnimatedStyled = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       { translateX: positionX.value },
  //       { translateY: positionY.value },
  //     ],
  //   };
  // });
  // const theme = useTheme();
  const navigation = useNavigation();

  function handleCarDetail(car: CarDTO) {
    navigation.navigate("CarDetail", { car });
  }

  // async function offlineDatabaseSync() {
  //   await synchronize({
  //     database,
  //     pullChanges: async ({ lastPulledAt, migration, schemaVersion }) => {
  //       // pega os dados do back end e atualiza o banco local
  //       const response = await api.get(
  //         `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
  //       );
  //       const { changes, latestVersion } = response.data;
  //       return { changes, timestamp: latestVersion };
  //     },
  //     pushChanges: async ({ changes, lastPulledAt }) => {
  //       const user = changes.users;
  //       await api.post(`/users/sync`, user);
  //     },
  //   });
  // }

  //
  // function handleMyCars() {
  //   navigation.navigate("MyCars");
  // }

  useEffect(() => {
    sync();
    console.log("home===");
    let isMounted = true;
    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        if (isMounted) {
          setCars(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();

    // indentifica que o componente foi desmontado, evitando memory leak
    return () => {
      isMounted = false;
    };
  }, []);

  // useEffect(() => {
  //   console.log("log");
  //   if (isConnected === true) {
  //     offlineDatabaseSync();
  //   }
  // }, [isConnected]);

  return (
    <Container>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          {!loading && <TotalCars>total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetail(item)} />
          )}
        />
      )}

      {/* identifica o gesto de arrastar */}
      {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsAnimatedStyled,
            { position: "absolute", bottom: 13, right: 22 },
          ]}
        >
          <ButtonAnimated
            onPress={handleMyCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler> */}
    </Container>
  );
}

// const styles = StyleSheet.create({
//   button: {
//     height: 60,
//     width: 60,
//     borderRadius: 30,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
