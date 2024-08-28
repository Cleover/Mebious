import React from "react";
import { Text, View } from "../Themed";
import { StyleSheet } from "react-native";
import { getTheme } from "../Themed";
import hexToRGBA from "../../Functions/HexToRGBA";

export default function Tag({ name }: { name: string }) {
  const THEME = getTheme();
  return (
    <View
      style={[styles.tag, { backgroundColor: hexToRGBA(THEME.highlight, 0.8) }]}
    >
      <Text style={styles.tagText}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  tagText: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
  },
});
