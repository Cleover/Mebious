import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ButtonsRow() {
  return (
    <View style={[styles.row, styles.paddingVertical15]}>
      <View style={styles.box} >
        <Ionicons
          size={30}
          name="chatbox-outline"
          color="white"
          style={styles.boxIcon}
        />
      </View>
      <View style={styles.box}>
        <Ionicons
          size={30}
          name="star-outline"
          color="white"
          style={styles.boxIcon}
        />
      </View>
      <View style={styles.box}>
        <Ionicons
          size={30}
          name="ellipsis-horizontal"
          color="white"
          style={styles.boxIcon}
        />
      </View>
      <View style={styles.longBox}>
        <View style={styles.longBoxRow}>
          <Ionicons
            size={20}
            name="pencil"
            color="white"
            style={styles.boxIcon}
          />
          <Text style={styles.longBoxText}>Playing</Text>
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
    backgroundColor: "rgb(0, 163, 131)",
    borderRadius: 15,
    padding: 10,
    width: 50,
    marginRight: 7,
    height: 50,
    justifyContent: "center",
  },
  longBox: {
    backgroundColor: "rgb(36, 100, 123)",
    borderRadius: 15,
    padding: 10,
    height: 50,
    flexGrow: 1,
    justifyContent: "center",
  },
  longBoxText: {
    paddingLeft: 10,
    color: "white",
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
