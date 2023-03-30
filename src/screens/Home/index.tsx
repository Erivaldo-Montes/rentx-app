import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";

import Logo from "../../assets/logo.svg";

import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const navigation = useNavigation();

  const car_1 = {
    brand: "AUdi",
    name: "RS 5 coupé",
    rent: {
      period: "ao dia",
      price: 120,
    },
    thumbnail:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_cg_hero_low/v1/editorial/vhs/Audi-RS5-Coupe.png",
  };

  function handleCarDetail() {
    navigation.navigate("CarDetail");
  }

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

          <TotalCars>total de 143 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={[1, 2, 3, 4]}
        keyExtractor={(item) => String(item)}
        renderItem={(props) => <Car data={car_1} onPress={handleCarDetail} />}
      />
    </Container>
  );
}
