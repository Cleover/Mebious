import React from "react";

import { StyleSheet } from "react-native";
import { getTheme } from "@/components/Themed";
import hexToRGBA from "@/Functions/HexToRGBA";
import { easeGradient } from "react-native-easing-gradient";
import { LinearGradient } from "expo-linear-gradient";

export default function TopGradient() {
  const THEME = getTheme();

  const { colors, locations } = easeGradient({
    colorStops: {
      0: {
        color: hexToRGBA(THEME.backgroundColor, 0.75),
      },
      1: {
        color: "transparent",
      },
    },
  });

  return (
    <LinearGradient
      colors={colors}
      locations={locations}
      style={[styles.topGradient, { pointerEvents: "none" }]}
    />
  );
}

const styles = StyleSheet.create({
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "15%",
  },
});
