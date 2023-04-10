import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { Container, InputText, IconContainer } from "./styles";
import { TextInputProps } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

interface Props extends TextInputProps {
  // seleciona apenas o nome
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const theme = useTheme();

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  function handleOnFocus() {
    setIsFocused(true);
  }

  function handleOnBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>
      <InputText
        {...rest}
        secureTextEntry={isPasswordVisible}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        isFocused={isFocused}
        autoCorrect={false}
      />

      <IconContainer isFocused={isFocused}>
        <BorderlessButton onPress={handlePasswordVisibilityChange}>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
          />
        </BorderlessButton>
      </IconContainer>
    </Container>
  );
}
