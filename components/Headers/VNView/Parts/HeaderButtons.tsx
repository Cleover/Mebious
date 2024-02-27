import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Text, View, getTheme } from "@/components/Themed";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import FormatTime from "@/Functions/FormatTime";
import { LinearGradient } from "expo-linear-gradient";
import * as DropdownMenu from "zeego/dropdown-menu";

import hexToRGBA from "@/Functions/HexToRGBA";

export default function HeaderButtons({
  length_minutes,
  length_votes,
}: {
  length_minutes: number;
  length_votes: number;
}) {
  const THEME = getTheme();

  return (
    <View style={{backgroundColor: "transparent"}}>
      <LinearGradient
        colors={[
          hexToRGBA(THEME.backgroundColor, 0.7),
          hexToRGBA(THEME.backgroundColor, 0.5),
          hexToRGBA(THEME.backgroundColor, 0.2),
          "rgba(0, 0, 0, 0)",
        ]}
        style={styles.gradient}
      />

      <View style={[styles.row, {backgroundColor: "transparent"}]}>
        <Pressable onPress={() => router.back()}>
          <View style={[styles.circle, THEME.option.primary]}>
            <Ionicons
              size={25}
              name="chevron-back"
              color={THEME.option.primary.color}
              style={styles.circleIcon}
            />
          </View>
        </Pressable>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <View style={[styles.box, THEME.option.primary]}>
              <Text
                style={[styles.boxText, { color: THEME.option.primary.color }]}
              >
                {FormatTime(length_minutes)}
              </Text>
            </View>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item key="content" disabled={true}>
              {`From ${length_votes.toLocaleString()} votes`}
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
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
    fontSize: 15,
    fontWeight: "bold",
  },
  gradient: {
    position: "absolute",
    top: -50,
    left: 0,
    right: 0,
    height: "250%",
  },
});
