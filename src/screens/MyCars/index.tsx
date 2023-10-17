import React, { useEffect, useState } from "react";

import { CarDTO } from "../../dtos/carsDTO";
import { api } from "../../services/api";
import { StatusBar, FlatList } from "react-native";
import { BackButton } from "../../components/BackButton";
import { LoadAnimation } from "../../components/LoadAnimation";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { Car } from "../../components/Car";
import { AntDesign } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";
import { Car as CarModel } from "../../database/models/car";
import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";

interface DataProps {
  id: string;
  car: CarModel;
  start_date: string;
  end_date: string;
}

export function MyCars() {
  const [cars, setCars] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchRentedCars() {
      try {
        const response = await api.get("/rentals");

        const dataFormated = response.data.map((data: DataProps) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), "dd/MM/yyyy"),
            end_date: format(parseISO(data.end_date), "dd/MM/yyyy"),
          };
        });

        setCars(dataFormated);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchRentedCars();
  }, [isFocused]);
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor={"transparent"}
        />
        <BackButton onPress={handleBack} color={theme.colors.shape} />

        <Title>
          Seus agendamentos, {"\n"}
          estão aqui
        </Title>

        <Subtitle>Conforto, segurança e praticidade</Subtitle>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={(props) => (
              <CarWrapper>
                <Car data={props.item.car} key={props.item.id} />
                <CarFooter>
                  <CarFooterTitle>Periodo</CarFooterTitle>

                  <CarFooterPeriod>
                    <CarFooterDate>{props.item.start_date}</CarFooterDate>

                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />

                    <CarFooterDate>{props.item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
