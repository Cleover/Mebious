import React, { type ReactElement } from "react";
import { Pressable, StyleSheet } from "react-native";
import { View, Text, getTheme } from "@/components/Themed";
import { easeGradient } from "react-native-easing-gradient";
import { LinearGradient } from "expo-linear-gradient";
import hexToRGBA from "@/Functions/HexToRGBA";
import { router, type Href, type RouteParamInput } from "expo-router";

export default function Card({
  index = 0,
  length = 1,
  width,
  height,
  moreTextTop = false,
  title,
  bodyContent,
  moreText,

  headerClickNavigation,
  moreTextClickNavigation,
  bodyContentClickNavigation,

  linkParams,
}: {
  index?: number;
  length?: number;
  width?: number;
  height?: number;
  moreTextTop?: boolean;
  title: string;
  bodyContent?: ReactElement;
  moreText: string;

  headerClickNavigation?: Href<string | object>;
  moreTextClickNavigation?: Href<string | object>;
  bodyContentClickNavigation?: Href<string | object>;

  linkParams?: RouteParamInput<any>;
}) {
  const THEME = getTheme();

  const { colors, locations } = easeGradient({
    colorStops: {
      0: {
        color: hexToRGBA("#232026", 0),
      },
      1: {
        color: "#232026",
      },
    },
  });

  const handleHeaderPress = () => {
    if (headerClickNavigation) {
      // @ts-ignore
      router.push({ pathname: headerClickNavigation, params: linkParams });
    }
  };

  const handleMoreTextPress = () => {
    if (moreTextClickNavigation) {
      // @ts-ignore
      router.push({ pathname: moreTextClickNavigation, params: linkParams });
    }
  };

  const handleBodyContentPress = () => {
    if (bodyContentClickNavigation) {
      // @ts-ignore
      router.push({ pathname: bodyContentClickNavigation, params: linkParams });
    }
  };

  return (
    <View
      style={[
        styles.column,
        {
          width: length == 1 ? "100%" : width,
          paddingLeft: index == 0 ? 13 : 6.5,
          paddingRight: index == length - 1 ? 13 : 6.5,
        },
      ]}
    >
      <Pressable onPress={handleHeaderPress}>
        <View
          style={[
            styles.titleBox,
            {
              borderBottomLeftRadius: !bodyContent ? 20 : 0,
              borderBottomRightRadius: !bodyContent ? 20 : 0,
            },
          ]}
        >
          <Text style={styles.title}>{title}</Text>
          {(moreTextTop || !bodyContent) && (
            <Text style={[styles.moreText]}>{moreText}</Text>
          )}
        </View>
      </Pressable>

      {bodyContent && (
        <Pressable onPress={handleBodyContentPress}>
          <View style={[styles.column, styles.bodyBox]}>
            <View
              style={{ height: height ? height : "auto", overflow: "hidden" }}
            >
              {bodyContent}

              {height && (
                <LinearGradient
                  pointerEvents="none"
                  colors={colors}
                  locations={locations}
                  style={styles.gradient}
                />
              )}
            </View>
            {!moreTextTop && (
              <Pressable onPress={handleMoreTextPress}>
                <Text
                  style={[
                    styles.moreText,
                    styles.pt10,
                    { color: THEME.highlight },
                  ]}
                >
                  {moreText}
                </Text>
              </Pressable>
            )}
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
  },
  titleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 13,
    paddingVertical: 10,
    backgroundColor: "#1A171C",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bodyBox: {
    paddingHorizontal: 13,
    paddingVertical: 10,
    backgroundColor: "#232026",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  pt10: {
    paddingTop: 10,
  },
  moreText: {
    fontSize: 14,
    fontWeight: "500",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
  },
});
