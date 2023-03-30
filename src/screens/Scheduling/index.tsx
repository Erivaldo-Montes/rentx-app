import React from "react";
import { BackButton } from "../../components/BackButton";
import { useTheme } from "styled-components";

import ArrowSvg from "../../assets/arrow.svg";
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Footer,
  Content,
} from "./styles";
import { useNavigation } from "@react-navigation/native";

export function Scheduling() {
  const theme = useTheme();

  const navigation = useNavigation();

  function handleConfirmRental() {
    navigation.navigate("SchedulingDetails");
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={"transparent"}
      />
      <Header>
        <BackButton onPress={() => {}} color={theme.colors.shape} />

        <Title>
          Escolha uma {"\n"}
          linha de início e {"\n"}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue select={true}>12/02/1232</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>AtÉ</DateTitle>
            <DateValue select={false}>12/02/1232</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title="confirmar" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
