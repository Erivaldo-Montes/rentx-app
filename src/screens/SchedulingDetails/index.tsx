import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

// components
import { BackButton } from "../../components/BackButton";
import { ImagesSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/carsDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { api } from "../../services/api";
import { Alert } from "react-native";
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
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";
import { useNetInfo } from "@react-native-community/netinfo";

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  end: string;
  start: string;
}

export function SchedulingDetails() {
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const theme = useTheme();
  const route = useRoute();
  const { car, dates } = route.params as Params;
  const navigation = useNavigation();
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const netInfo = useNetInfo();
  const totalRental = Number(dates.length * car.price);

  async function handleConfirmRental() {
    setLoading(true);

    await api
      .post(`rentals`, {
        user_id: 3,
        car_id: car.id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: totalRental,
      })
      .then(() =>
        navigation.navigate("Confirmation", {
          title: "Carro alugado!",
          message:
            "Agora você só precisa ir\naté a concessionária da RENTX\npegar seu automóvel",
          nextScreenRoute: "Home",
        })
      )
      .catch(() => {
        setLoading(false);
        Alert.alert("Não possível comfirmar o agendamento");
      });
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

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
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImagesSlider
          imagesUrl={
            !!carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.id, photo: car.thumbnail }]
          }
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.period}</Price>
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÈ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>

            <RentalPriceTotal>R$ {totalRental}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
