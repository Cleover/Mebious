import React from "react";
import { Text as DefaultText, View as DefaultView } from "react-native";
import { useColorScheme } from "./useColorScheme";

import Theme from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";
const selectedTheme = Theme.default;

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type IconProps = ThemeProps & React.ComponentProps<typeof Ionicons>;

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

  const borderColor = useThemeColor({
    light: selectedTheme.light.highlight,
    dark: selectedTheme.dark.highlight,
  });

  return <DefaultView style={[{ borderColor }, style]} {...otherProps} />;
}

export function Box(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  const backgroundColor = useThemeColor({
    light: selectedTheme.light.highlight,
    dark: selectedTheme.dark.highlight,
  });

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Background(props: ViewProps) {
  const { className, style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({
    light: selectedTheme.light.backgroundColor,
    dark: selectedTheme.dark.backgroundColor,
  });

  return <DefaultView className={`flex-1 ${className}`} style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Icon(props: IconProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({
    light: selectedTheme.light.color,
    dark: selectedTheme.dark.color,
  });

  return <Ionicons color={color} {...otherProps} />;
}

export function getTheme() {
  const systemTheme = useColorScheme() ?? "dark";
  return selectedTheme[systemTheme];
}
