import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
  width: 80px;
  height: 56px;

  background-color: ${(props) => props.theme.colors.shape_dark};

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.primary_500};
  color: ${(props) => props.theme.colors.shape};
  font-size: ${RFValue(15)}px;
`;
