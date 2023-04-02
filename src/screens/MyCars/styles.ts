import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background_primary};
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
  font-size: ${RFValue(30)}px;

  margin-top: 24px;
`;

export const Subtitle = styled.Text`
  color: ${(props) => props.theme.colors.shape};
  font-family: ${(props) => props.theme.fonts.secondary_400};
  font-size: ${RFValue(15)}px;

  margin-top: 24px;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 16px;
`;

export const Appointments = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;

  padding: 24px 0;
`;

export const AppointmentsTitle = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
`;

export const AppointmentsQuantity = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
`;

export const CarWrapper = styled.View`
  margin-bottom: 16px;
`;

export const CarFooter = styled.View`
  width: 100%
  padding: 12px;
  margin-top:-10px;
  flex-direction:row ;
  align-items: center;
  justify-content: space-between;

  background-color: ${(props) => props.theme.colors.background_secondary}; ;

`;

export const CarFooterTitle = styled.Text`
  color: ${(props) => props.theme.colors.text_detail};
  font-family: ${(props) => props.theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
`;

export const CarFooterPeriod = styled.View`
  flex-direction: row;
`;

export const CarFooterDate = styled.Text`
  color: ${(props) => props.theme.colors.title};
  font-family: ${(props) => props.theme.fonts.primary_400};
  font-size: ${RFValue(13)}px;
`;
