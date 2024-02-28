import React, { useState } from "react";
import { View, Text, getTheme } from "../Themed";
import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import type { ReleaseDataType } from "@/Definitions/ReleaseType";
import hexToRGBA from "@/Functions/HexToRGBA";

import { SvgUri } from "react-native-svg";

import getSVGSize from "@/constants/SVGTable";

export default function ReleaseCell({
  releaseData,
}: {
  releaseData: ReleaseDataType;
}) {
  const THEME = getTheme();

  return (
    <View style={styles.pv10}>
      <View
        style={[
          styles.releaseBox,
          { backgroundColor: hexToRGBA(THEME.highlight, 0.2) },
        ]}
      >
        <View style={[styles.row, { backgroundColor: "transparent" }]}>
          <View style={[styles.rowLeft, { backgroundColor: "transparent" }]}>
            <Text style={[styles.title, styles.bold]}>{releaseData.title}</Text>
          </View>
          <View style={[styles.rowRight, { backgroundColor: "transparent" }]}>
            {releaseData.platforms?.map((platform, index) => (
              <View
                style={[{ paddingLeft: 3 }, { backgroundColor: "transparent" }]}
                key={index}
              >
                <SvgUri
                  key={index}
                  width={getSVGSize(platform)?.x ?? 0}
                  height={getSVGSize(platform)?.y ?? 0}
                  uri={`https://raw.githubusercontent.com/Cleover/Mebious/main/.github/VNDB/Platform/${platform}.svg`}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  releaseBox: {
    width: "100%",
    borderRadius: 5,
    padding: 10,
  },
  pv10: {
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  rowLeft: {
    flex: 1,
  },
  rowRight: {
    flexDirection: "row",
  },
  title: {
    fontSize: 15,
  },
  bold: {
    fontWeight: "bold",
  },
});
