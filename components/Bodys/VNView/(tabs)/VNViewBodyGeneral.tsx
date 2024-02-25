import React, { useState } from "react";
import { View, Text } from "../../../Themed";
import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { VNDataType } from "@/Definitions/VNType";

const contentOptions = ["Content", "Technical"];
const spoilerOptions = ["Hide Spoilers", "Minor Spoilers", "Spoil Me!"];
const summaryOptions = ["Summary", "All"];

export default function VNViewBodyGeneral({ vnData }: { vnData: VNDataType }) {
  const [expandDescription, setExpandDescription] = useState(false);
  const [expandTags, setExpandTags] = useState(false);

  const tags = vnData.tags ?? [];

  let showingTypeIndex = 0;
  let selectedOptionIndex = 0;

  let showingContent = true;
  let showingTechnical = true;

  let showingSummary = true;
  let showingAll = false;

  var sortedTags = tags.slice().sort(function (a, b) {
    return (a.rating || 0.0) > (b.rating || 0.0) ? -1 : 1;
  });

  var filteredTags = sortedTags
    .filter(function (tag) {
      return (
        (tag.spoiler || 0) <= selectedOptionIndex &&
        ((tag.category === "cont" && showingContent) ||
          (tag.category === "tech" && showingTechnical) ||
          tag.category === "ero" ||
          (tag.category !== "cont" &&
            tag.category !== "tech" &&
            tag.category !== "ero"))
      );
    })
    .filter(function (tag) {
      if (showingTypeIndex === 0) {
        return (tag.rating || 0) >= 2.0;
      } else {
        return true;
      }
    });

  var trimmedTags = filteredTags.slice(0, 15);

  const toggleDescription = () => {
    setExpandDescription(!expandDescription);
  };

  const toggleTags = () => {
    setExpandTags(!expandTags);
  };

  return (
    <View style={styles.transparent}>
      <Text style={[styles.title, styles.bold, styles.pt20]}>Description</Text>
      <Text
        numberOfLines={expandDescription ? undefined : 3}
        style={[styles.pt10, styles.white]}
      >
        {vnData.description}
      </Text>

      <Pressable onPress={toggleDescription}>
        <Text style={styles.readStyle}>
          {expandDescription ? "Read Less" : "Read More"}
        </Text>
      </Pressable>

      <View style={[styles.row, styles.transparent, styles.pt20]}>
        <Text style={[styles.title, styles.bold, styles.transparent]}>
          Tags
        </Text>
        <View style={[styles.alignRight, styles.transparent]}>
          <Pressable onPress={toggleTags}>
            <View style={styles.box}>
              <Ionicons
                size={20}
                name={expandTags ? "chevron-down" : "chevron-up"}
                color="white"
                style={styles.boxIcon}
              />
            </View>
          </Pressable>
          <View style={styles.box}>
            <Ionicons
              size={20}
              name="ellipsis-horizontal"
              color="white"
              style={styles.boxIcon}
            />
          </View>
        </View>
      </View>
      <View style={[styles.tagsContainer, styles.transparent, styles.pt20]}>
        {(expandTags ? filteredTags : trimmedTags).map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={[styles.white, styles.fs13, styles.bold]}>
              {tag.name}
            </Text>
            <Text style={[styles.white, styles.fs10, styles.pl3]}>
              {(tag.rating ?? 0).toFixed(1)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  transparent: {
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 30,
  },
  bold: {
    fontWeight: "bold",
  },
  pt10: {
    paddingTop: 10,
  },
  pt20: {
    paddingTop: 20,
  },
  white: {
    color: "white",
  },
  fs10: {
    fontSize: 10,
  },
  fs13: {
    fontSize: 13,
  },
  pl3: {
    paddingLeft: 3,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  readStyle: {
    paddingTop: 3,
    paddingRight: 5,
    fontSize: 15,
    color: "rgb(36, 100, 123)",
  },
  tag: {
    backgroundColor: "rgb(36, 100, 123)",
    borderRadius: 8,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  box: {
    backgroundColor: "rgb(36, 100, 123)",
    borderRadius: 15,
    padding: 10,
    width: 40,
    marginLeft: 7,
    height: 40,
    justifyContent: "center",
  },
  boxIcon: {
    textAlign: "center",
  },
  alignRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
