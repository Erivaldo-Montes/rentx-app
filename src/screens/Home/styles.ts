import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList } from "react-native";
import { CarDTO } from "../../dtos/carsDTO";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  flex: 1;

  background-color: ${(props) => props.theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;

  background-color: ${(props) => props.theme.colors.header};

  justify-content: flex-end;
  padding: 32px 24px;
`;

export const HeaderContent = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.primary_400};
`;

export const CarList = styled(FlatList as new () => FlatList<CarDTO>).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalIndicatorScroll: false,
})``;

export const MyCarsButton = styled(RectButton)`
  height: 60px;
  width: 60px;

  border-radius: 30px;

  background-color: ${(props) => props.theme.colors.main};

  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 13px;
  right: 22px;
`;
