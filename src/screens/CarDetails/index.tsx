import React from "react";

// styles
import {
  Container,
  Header,
  CarImages,
  Content,
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
} from "./styles";

// components
import { BackButton } from "../../components/BackButton";
import { ImagesSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

// images
import SpeedSvg from "../../assets/speed.svg";
import AccelerationSvg from "../../assets/acceleration.svg";
import ForceSvg from "../../assets/force.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import ExchangeSvg from "../../assets/exchange.svg";
import PeopleSvg from "../../assets/people.svg";

export function CarDetail() {
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImagesSlider
          imagesUrl={[
            "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_cg_hero_low/v1/editorial/vhs/Audi-RS5-Coupe.png",
          ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Ferrari</Brand>
            <Name>gt 1000</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>
        <Accessories>
          <Accessory icon={SpeedSvg} name="380km/h" />
          <Accessory icon={AccelerationSvg} name="3.2s" />
          <Accessory icon={ForceSvg} name="800HP" />
          <Accessory icon={GasolineSvg} name="gasolina" />
          <Accessory icon={ExchangeSvg} name="auto" />
          <Accessory icon={PeopleSvg} name="2 pessoas" />
        </Accessories>

        <About>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos id
          possimus et cum enim quibusdam incidunt mollitia aspernatur magnam
          molestias. Cum adipisci numquam optio odio unde blanditiis deleniti,
          sed nobis?
        </About>
      </Content>

      <Footer>
        <Button title="comfimar" color="green" />
      </Footer>
    </Container>
  );
}
