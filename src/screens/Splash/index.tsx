import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Button, StyleSheet } from "react-native";

import { Container } from "./styles";
import { Text } from "react-native";

export function Splash() {
  const animation = useSharedValue(0);
  const animatedStyled = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animation.value }],
    };
  });

  function handleAnimationPosition() {
    animation.value = Math.random() * 300;
  }
  return (
    <Container>
      <Animated.View style={[styles.box, animatedStyled]} />

      <Button title="mover" onPress={handleAnimationPosition} />
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: "red",
  },
});
