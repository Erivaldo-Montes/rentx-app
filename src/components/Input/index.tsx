import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { Container, InputText, IconContainer } from "./styles";
import { TextInputProps } from "react-native";

interface Props extends TextInputProps {
  // seleciona apenas o nome
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function Input({ iconName, value, ...rest }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

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
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        isFocused={isFocused}
      />
    </Container>
  );
}
