import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { View, getTheme } from "@/components/Themed";
import hexToRGBA from "@/Functions/HexToRGBA";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

export default function BackNavbar({
  rightSideContent,
}: {
  rightSideContent?: any;
}) {
  const insets = useSafeAreaInsets();

  const THEME = getTheme();

  return (
    <View style={styles.shadow}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Pressable onPress={() => router.back()}>
          <BlurView
            tint="dark"
            intensity={10}
            style={[
              {
                backgroundColor: hexToRGBA(THEME.backgroundColor, 0.8),
                borderColor: hexToRGBA(THEME.color, 0.8),
                shadowColor: hexToRGBA(THEME.color, 0.8),
                overflow: "hidden",
              },
              styles.outline,
            ]}
          >
            <View style={styles.circle}>
              <Ionicons
                size={28}
                name="chevron-back"
                color={THEME.option.primary.color}
                style={styles.circleIcon}
              />
            </View>
          </BlurView>
        </Pressable>

        {rightSideContent}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    paddingHorizontal: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  outline: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 3,

    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 0,
  },
  circle: {
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
    shadowOpacity: 0.5,
    shadowColor: "black",
  },
  circleIcon: {
    marginLeft: -2,
    textAlign: "center",
  },
});
