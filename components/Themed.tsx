import React from "react";
import { Text as DefaultText, View as DefaultView } from "react-native";
import { useColorScheme } from "./useColorScheme";

import Theme from "@/constants/Theme";
const selectedTheme = Theme.default;

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function useThemeColor(props: {
  light?: string | undefined;
  dark?: string | undefined;
}) {
  const systemTheme = useColorScheme() ?? "dark";
  const colorFromProps = props[systemTheme];
  return colorFromProps;
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({
    light: selectedTheme.light.color,
    dark: selectedTheme.dark.color,
  });

  return (
    <DefaultText
      style={[{ color }, style, { fontFamily: "Inter" }]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  return <DefaultView style={[style]} {...otherProps} />;
}

export function Background(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({
    light: selectedTheme.light.backgroundColor,
    dark: selectedTheme.dark.backgroundColor,
  });

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function getTheme() {
  const systemTheme = useColorScheme() ?? "dark";
  return selectedTheme[systemTheme];
}
