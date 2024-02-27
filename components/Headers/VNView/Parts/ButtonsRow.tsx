import React from "react";
import { StyleSheet } from "react-native";
import { Text, View, getTheme } from "@/components/Themed";

import { Ionicons } from "@expo/vector-icons";

export default function ButtonsRow() {
  const THEME = getTheme();

  return (
    <View
      style={[
        styles.row,
        styles.paddingVertical15,
        { backgroundColor: "transparent" },
      ]}
    >
      <View style={[styles.box, THEME.option.secondary]}>
        <Ionicons
          size={30}
          name="chatbox-outline"
          color={THEME.option.secondary.color}
          style={styles.boxIcon}
        />
      </View>
      <View style={[styles.box, THEME.option.secondary]}>
        <Ionicons
          size={30}
          name="star-outline"
          color={THEME.option.secondary.color}
          style={styles.boxIcon}
        />
      </View>
      <View style={[styles.box, THEME.option.secondary]}>
        <Ionicons
          size={30}
          name="ellipsis-horizontal"
          color={THEME.option.secondary.color}
          style={styles.boxIcon}
        />
      </View>
      <View style={[styles.longBox, THEME.option.primary]}>
        <View style={[styles.longBoxRow, { backgroundColor: "transparent" }]}>
          <Ionicons
            size={20}
            name="pencil"
            color={THEME.option.primary.color}
            style={styles.boxIcon}
          />
          <Text
            style={[styles.longBoxText, { color: THEME.option.primary.color }]}
          >
            Playing
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  paddingVertical15: {
    paddingVertical: 15,
  },
  box: {
    borderRadius: 15,
    padding: 10,
    width: 50,
    marginRight: 7,
    height: 50,
    justifyContent: "center",
  },
  longBox: {
    borderRadius: 15,
    padding: 10,
    height: 50,
    flexGrow: 1,
    justifyContent: "center",
  },
  longBoxText: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  longBoxRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  boxIcon: {
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
});
