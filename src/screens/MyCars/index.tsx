import React, { useEffect, useState } from "react";

import { CarDTO } from "../../dtos/carsDTO";
import { api } from "../../services/api";
import { StatusBar, FlatList } from "react-native";
import { BackButton } from "../../components/BackButton";
import { Load } from "../../components/Load";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { Car } from "../../components/Car";
import { AntDesign } from "@expo/vector-icons";
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

interface CarProps {
  id: number;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchRentedCars() {
      try {
        const response = await api.get("/schedulesByUser?user_id=3");

        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchRentedCars();
  }, []);
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
        <Load />
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
                    <CarFooterDate>{props.item.startDate}</CarFooterDate>

                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />

                    <CarFooterDate>{props.item.endDate}</CarFooterDate>
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
