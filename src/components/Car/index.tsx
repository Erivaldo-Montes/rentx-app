import React from "react";
import { Car as CarModel } from "../../database/models/car";
import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Price,
  Type,
  CarImage,
  Period,
} from "./styles";

import { RectButtonProps } from "react-native-gesture-handler";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { useNetInfo } from "@react-native-community/netinfo";

interface Props extends RectButtonProps {
  data: CarModel;
}

export function Car({ data, ...rest }: Props) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);
  const netInfo = useNetInfo();
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.name}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${
              netInfo.isConnected === true ? data.price : "..."
            }`}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage
        source={{
          uri: data.thumbnail,
        }}
        resizeMode="contain"
      />
    </Container>
  );
}
