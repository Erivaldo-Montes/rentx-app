import React from "react";
import { useTheme } from "styled-components";
import { ActivityIndicator } from "react-native";
import { Container, Title } from "./styles";

interface Props {
  title: string;
  color?: string;
  onPress: () => void;
  enable?: boolean;
  loading?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enable = true,
  loading = false,
}: Props) {
  const theme = useTheme();
  return (
    <Container
      onPress={onPress}
      color={color ? color : theme.colors.main}
      enabled={enable}
      style={{ opacity: enable === false || loading === true ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} size={25} />
      ) : (
        <Title>{title}</Title>
      )}
    </Container>
  );
}
