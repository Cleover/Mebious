import React, { useState } from "react";
import { View, Text, getTheme } from "../../../Themed";
import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import type { ReleaseDataType } from "@/Definitions/ReleaseType";

import groupByLang from "@/Functions/GroupByLang";
import getLanguageName from "@/constants/LangCodes";

import ReleaseCell from "@/components/Cells/ReleaseCell";

export default function VNViewBodyReleases({
  releasesData,
}: {
  releasesData: ReleaseDataType[];
}) {
  const THEME = getTheme();

  const [toggledReleases, setToggleRelease] = useState<{
    [region: string]: boolean;
  }>({});

  const toggleRelease = (region: string) => {
    setToggleRelease((prevState) => ({
      ...prevState,
      [region]: !prevState[region],
    }));
  };

  const groupedData = groupByLang(releasesData);

  return (
    <View style={styles.pb20}>
      {Object.keys(groupedData).map((groupKey) => (
        <View key={groupKey} style={[styles.ph20]}>
          <View style={[styles.row, styles.pt20]}>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, styles.bold]}>{getLanguageName(groupKey)}</Text>
            </View>
            <View style={[styles.buttonsContainer]}>
              <Pressable
                onPress={() => {
                  toggleRelease(groupKey);
                }}
              >
                <View style={[styles.box, THEME.option.primary]}>
                  <Ionicons
                    size={10}
                    name={
                      toggledReleases[groupKey] ? "chevron-down" : "chevron-up"
                    }
                    color={THEME.option.primary.color}
                    style={styles.boxIcon}
                  />
                </View>
              </Pressable>
            </View>
          </View>

          {toggledReleases[groupKey] &&
            groupedData[groupKey]!.map((release) => (
              <ReleaseCell key={release.id} releaseData={release} />
            ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  ph20: {
    paddingHorizontal: 20,
  },
  pt20: {
    paddingTop: 20,
  },
  pb20: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  box: {
    borderRadius: 10,
    padding: 10,
    width: 30,
    marginLeft: 7,
    height: 30,
    justifyContent: "center",
  },
  boxIcon: {
    textAlign: "center",
  },
  titleContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
});
