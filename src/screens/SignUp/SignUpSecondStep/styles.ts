import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  padding: 0 24px;

  background: ${(props) => props.theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${getStatusBarHeight() + 30}px;
`;

export const StepsSignUp = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size:${RFValue(40)}px
  font-family: ${(props) => props.theme.fonts.secondary_600};
  color: ${(props) => props.theme.colors.title};
  margin-top: 60px;

`;

export const Subtitle = styled.Text`
  font-size:${RFValue(15)}px
  font-family: ${(props) => props.theme.fonts.primary_400};
  color: ${(props) => props.theme.colors.text};
  line-height: 25px;
  margin-bottom: 16px;
`;

export const Form = styled.View`
  width: 100%;
  margin-top: 64px;
  margin-bottom: 16px;
`;

export const FormTitle = styled.Text`
  font-size:${RFValue(20)}px
  font-family: ${(props) => props.theme.fonts.secondary_600};
  color: ${(props) => props.theme.colors.title};
  margin-bottom: 24px;
`;
