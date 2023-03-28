import React from "react";

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

import GasolineSvg from "../../assets/gasoline.svg";

interface CarData {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
}

interface Props {
  data: CarData;
}

export function Car(data: Props) {
  return (
    <Container>
      <Details>
        <Brand>{data.data.name}</Brand>
        <Name>{data.data.name}</Name>

        <About>
          <Rent>
            <Period>{data.data.rent.period}</Period>
            <Price>{`R$ ${data.data.rent.price}`}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Details>

      <CarImage
        source={{
          uri: data.data.thumbnail,
        }}
        resizeMode="contain"
      />
    </Container>
  );
}
