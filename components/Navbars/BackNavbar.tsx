import React from "react";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon, View, Text, getTheme } from "@/components/Themed";
import hexToRGBA from "@/Functions/HexToRGBA";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

export default function BackNavbar({
  rightSideContent,
  opacity = 1,
}: {
  rightSideContent?: any;
  opacity?: number;
}) {
  const insets = useSafeAreaInsets();

  const THEME = getTheme();

  return (
    <View
      className="absolute flex-row justify-between items-center px-4"
      style={[
        {
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.5,
          width: "100%",
          paddingTop: insets.top,
          opacity: opacity,
          pointerEvents: opacity == 0 ? "none" : "auto",
        },
      ]}
    >
      <Pressable onPress={() => router.back()}>
        <BlurView
          tint="dark"
          intensity={10}
          className="border rounded-full overflow-hidden"
          style={[
            {
              padding: 4,
              backgroundColor: hexToRGBA(THEME.backgroundColor, 0.8),
              borderColor: hexToRGBA(THEME.color, 0.8),
            },
          ]}
        >
          <View style={{ marginLeft: -1, paddingRight: 1 }}>
            <Icon size={28} name="chevron-back" />
          </View>
        </BlurView>
      </Pressable>

      {rightSideContent}
    </View>
  );
}
