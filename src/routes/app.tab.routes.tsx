import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppStackRoutes } from "./app.stack.routes";
import { Home } from "../screens/Home";
import { MyCars } from "../screens/MyCars";
import { useTheme } from "styled-components";

import HomeSvg from "../assets/home.svg";
import CarSvg from "../assets/car.svg";
import PeopleSvg from "../assets/people.svg";
import { Platform } from "react-native";
import { Profile } from "../screens/Profle";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.main,
        inactiveTintColor: theme.colors.text_detail,
        showLabel: false,
        style: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary,
        },
      }}
    >
      <Screen
        name="Home"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            // para mudar a cor do svg deve-se remover o propriedade fill do svg e do path
            <HomeSvg height={24} width={24} fill={color} />
          ),
        }}
      />

      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg height={24} width={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <PeopleSvg height={24} width={24} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
}
