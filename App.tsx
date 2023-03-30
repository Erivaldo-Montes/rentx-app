import "react-native-gesture-handler";
import React from "react";
import { ThemeProvider } from "styled-components";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import theme from "./src/styles/theme";
import { Routes } from "./src/routes";

import {
  useFonts,
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from "@expo-google-fonts/archivo";

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
