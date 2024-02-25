import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import FormatTime from "@/Functions/FormatTime";
import { LinearGradient } from "expo-linear-gradient";

export default function HeaderButtons({
  length_minutes,
}: {
  length_minutes: number;
}) {
  return (
    <View>
      <LinearGradient
        colors={[
          "rgba(6, 16, 28, 0.7)",
          "rgba(6, 16, 28, 0.5)",
          "rgba(6, 16, 28, 0.2)",
          "rgba(6, 16, 28, 0)",
        ]}
        style={styles.gradient}
      />

      <View style={[styles.row]}>
        <Pressable onPress={() => router.back()}>
          <View style={[styles.circle, styles.backgroundColor]}>
            <Ionicons
              size={25}
              name="chevron-back"
              color="white"
              style={styles.circleIcon}
            />
          </View>
        </Pressable>
        <View style={[styles.box, styles.backgroundColor]}>
          <Text style={styles.boxText}>{FormatTime(length_minutes)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  circle: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  box: {
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 40,
    justifyContent: "center",
  },
  circleIcon: {
    textAlign: "center",
  },
  boxText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  backgroundColor: {
    backgroundColor: "rgb(36, 100, 123)",
  },
  gradient: {
    position: "absolute",
    top: -50,
    left: 0,
    right: 0,
    height: "250%",
  },
});
