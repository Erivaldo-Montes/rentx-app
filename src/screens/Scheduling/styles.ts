import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

interface DateValueProps {
  select: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background_secondary};
`;

export const Header = styled.View`
  width: 100%;
  height: 325px;

  background-color: ${(props) => props.theme.colors.header};
  justify-content: center;
  padding: 25px;

  padding-top: ${getStatusBarHeight() + 30}px;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.shape};
  font-family: ${(props) => props.theme.fonts.secondary_600};
  font-size: ${RFValue(34)}px;

  margin-top: 24px;
`;

export const RentalPeriod = styled.View`
  width: 100%;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  margin: 32px 0;
`;

export const DateInfo = styled.View`
  width: 30%;
`;

export const DateTitle = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
`;

export const DateValue = styled.Text<DateValueProps>`
  color: ${(props) => props.theme.colors.shape};
  font-family: ${(props) => props.theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;

  ${(props) =>
    !props.select &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${props.theme.colors.text};
      padding-bottom: 5px;
    `}
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 24,
  },
  showsVerticalSrollIndicator: false,
})``;

export const Footer = styled.View`
  padding: 24px;
`;
