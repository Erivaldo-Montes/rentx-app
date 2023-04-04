import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, BackHandler } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import { Ionicons } from "@expo/vector-icons";
import { api } from "../../services/api";
import Logo from "../../assets/logo.svg";
import { LoadAnimation } from "../../components/LoadAnimation";
import { Car } from "../../components/Car";
import { Load } from "../../components/Load";
import { CarDTO } from "../../dtos/carsDTO";
import { useTheme } from "styled-components";
import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      // armazena a posição do botão
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });
  const myCarsAnimatedStyled = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });
  const navigation = useNavigation();
  const theme = useTheme();

  function handleCarDetail(car: CarDTO) {
    navigation.navigate("CarDetail", { car });
  }

  function handleMyCars() {
    navigation.navigate("MyCars");
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }, []);

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
          renderItem={(props) => (
            <Car
              data={props.item}
              onPress={() => handleCarDetail(props.item)}
            />
          )}
        />
      )}

      {/* identifica o gesto de arrastar */}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
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
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
