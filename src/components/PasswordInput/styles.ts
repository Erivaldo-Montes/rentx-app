import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface Props {
  isFocused: boolean;
}
export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconContainer = styled.View<Props>`
  height: 55px;
  width: 55px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
  background-color: ${(props) => props.theme.colors.background_secondary};

  ${({ theme, isFocused }) =>
    isFocused
      ? css`
          border-bottom-width: 2px;
          border-bottom-color: ${theme.colors.main};
        `
      : css`
          border-bottom-width: 2px;
          border-bottom-color: transparent;
        `}
`;

export const InputText = styled.TextInput<Props>`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background_secondary};
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  padding: 0 23px;

  ${({ theme, isFocused }) =>
    isFocused
      ? css`
          border-bottom-width: 2px;
          border-bottom-color: ${theme.colors.main};
        `
      : css`
          border-bottom-width: 2px;
          border-bottom-color: transparent;
        `}
`;
