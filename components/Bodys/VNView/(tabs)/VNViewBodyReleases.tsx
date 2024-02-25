import React from "react";
import { View, Text } from "../../../Themed";
import { StyleSheet } from "react-native";

import { VNDataType } from "@/Definitions/VNType";

export default function VNViewBodyReleases({ vnData }: { vnData: VNDataType }) {
  return (
    <View style={styles.container}>
      <Text>Releases</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: "transparent",
    width: "100%",
  },
});
