import React, { useState } from "react";
import { Text, View, getTheme } from "../../../components/Themed";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, ScrollView } from "react-native";
import BackNavbar from "@/components/Navbars/BackNavbar";
import { clamp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Description() {
  const params = useLocalSearchParams();
  const { description } = params;

  const insets = useSafeAreaInsets();

  const [opacity, setOpacity] = useState<number>(1);

  const THEME = getTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: THEME.backgroundColor }]}
    >
      <ScrollView
        onScroll={(event) => {
          const currentOffset = event.nativeEvent.contentOffset.y;

          const opacity = clamp(((currentOffset - 50) / 50) * -1, 0, 1);
          setOpacity(opacity);
        }}
      >
        <View style={{ paddingTop: 100, paddingBottom: insets.bottom }}>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </ScrollView>

      <View
        style={[
          styles.top,
          { opacity, pointerEvents: opacity == 0 ? "none" : "auto" },
        ]}
      >
        <BackNavbar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 13,
  },
  descriptionScroll: {
    paddingTop: 100,
  },
  top: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  description: {
    paddingTop: 13,
  },
});
