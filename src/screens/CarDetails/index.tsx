import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
// styles
import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
  OfflineInfo,
} from "./styles";

// components
import { BackButton } from "../../components/BackButton";
import { ImagesSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";
import { CarDTO } from "../../dtos/carsDTO";
import { Car as CarModel } from "../../database/models/car";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { StatusBar } from "react-native";
import { StyleSheet } from "react-native";
import { useTheme } from "styled-components";
import { api } from "../../services/api";
import { useNetInfo } from "@react-native-community/netinfo";

interface Params {
  car: CarModel;
}

export function CarDetail() {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();
  const netInfo = useNetInfo();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0]),
    };
  });

  const { car } = route.params as Params;

  function handleConfirmRental() {
    navigation.navigate("Scheduling", { car });
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if (netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected]);
  return (
    <Container>
      <StatusBar
        barStyle={"dark-content"}
        translucent
        backgroundColor={"transparent"}
      />
      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secondary },
        ]}
      >
        <Header>
          <BackButton onPress={handleBack} />
        </Header>

        <Animated.View style={[sliderCarsStyleAnimation]}>
          <CarImages>
            <ImagesSlider
              imagesUrl={
                !!carUpdated.photos
                  ? carUpdated.photos
                  : [{ id: car.id, photo: car.thumbnail }]
              }
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>{`R$ ${
              netInfo.isConnected === true ? car.price : "..."
            }`}</Price>
          </Rent>
        </Details>
        <Accessories>
          {carUpdated.accessories &&
            carUpdated.accessories.map((accessory) => (
              <Accessory
                icon={getAccessoryIcon(accessory.type)}
                name={accessory.name}
                key={accessory.type}
              />
            ))}
        </Accessories>

        <About>{car.about}</About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title="escolher periodo de aluguel"
          onPress={handleConfirmRental}
          enabled={netInfo.isConnected === true}
        />
        {netInfo.isConnected === false && (
          <OfflineInfo>Conete-se a internet para mais detalhes</OfflineInfo>
        )}
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  },
});
