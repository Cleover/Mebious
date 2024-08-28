import React from "react";
import { ScrollView, StyleSheet, Pressable } from "react-native";
import { Text, View, getTheme } from "@/components/Themed";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import type { VNDataType } from "@/Definitions/VNType";

import hexToRGBA from "@/Functions/HexToRGBA";
import { easeGradient } from "react-native-easing-gradient";

const blurhash = "CEN]Rv-WPn^N}SQ[VFNF";

export default function CoverCarousel({
  vnsData,
  height,
}: {
  vnsData: VNDataType[];
  height: number;
}) {
  const coverWidth = (2 / 3) * height;

  const THEME = getTheme();

  const { colors, locations } = easeGradient({
    colorStops: {
      0: {
        color: "transparent",
      },
      0.7: {
        color: hexToRGBA(THEME.backgroundColor, 0.7),
      },
      1: {
        color: hexToRGBA(THEME.backgroundColor, 0.9),
      },
    },
  });

  return (
    <View style={{ height }}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          paddingLeft: 13,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {vnsData.map((vnData, index) => (
          <Link
            href={{
              pathname: "/home/VNView",
              params: { vnID: vnData.id },
            }}
            key={index}
            style={[
              styles.cover,
              { width: coverWidth, shadowColor: THEME.highlight },
            ]}
            asChild
          >
            <Pressable>
              <Image
                style={styles.image}
                source={vnData.image?.url ?? ""}
                placeholder={blurhash}
                contentFit="cover"
                placeholderContentFit="cover"
                blurRadius={vnData.image?.sexual! >= 0.5 ? 100 : 0}
                transition={300}
              />
              <LinearGradient
                colors={colors}
                locations={locations}
                style={styles.gradient}
              />
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={2}
                style={styles.text}
              >
                {vnData.title}
              </Text>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cover: {
    position: "relative",
    marginBottom: 20,
    marginRight: 13,

    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  image: {
    flex: 1,
    borderRadius: 7,
    width: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    borderRadius: 7,
  },
  text: {
    position: "absolute",
    bottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
});
