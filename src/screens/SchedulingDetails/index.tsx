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

  const totalRental = Number(dates.length * car.rent.price);

  async function handleConfirmRental() {
    setLoading(true);
    const schedules = await api.get(`/schedulesByCars/${car.id}`);

    const unavailable_dates = [...schedules.data.unavailable_dates, ...dates];

    await api.post(`/schedulesByUser`, {
      user_id: 3,
      car,
      startDate: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      endDate: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });

    await api
      .put(`/schedulesByCars/${car.id}`, {
        id: car.id,
        unavailable_dates,
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
  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImagesSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>
        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              icon={getAccessoryIcon(accessory.type)}
              name={accessory.name}
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
            <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>

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
