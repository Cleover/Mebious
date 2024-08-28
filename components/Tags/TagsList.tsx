import React, { useState } from "react";
import { View, Text, getTheme } from "../Themed";
import { StyleSheet, Pressable } from "react-native";
import type { VNTagType } from "@/Definitions/VNType";
import hexToRGBA from "@/Functions/HexToRGBA";
import { Ionicons } from "@expo/vector-icons";

const MAX_TAGS = 8;

export default function TagsList({
  tags,
  showFull = false,
  selectedSpoilerIndex = 0,
  showingContent = true,
  showingSexual = false,
  showingTechnical = true,
}: {
  tags: VNTagType[];
  showFull?: boolean;
  selectedSpoilerIndex?: number;
  showingContent?: boolean;
  showingSexual?: boolean,
  showingTechnical?: boolean,
}) {
  const [state, setState] = useState({ expandTags: false });
  const { expandTags } = state;

  const toggleTags = () => setState({ ...state, expandTags: !expandTags });

  const THEME = getTheme();

  const filteredTags = tags
    .filter(
      (tag) =>
        (tag.spoiler || 0) <= selectedSpoilerIndex &&
        ((tag.category === "cont" && showingContent) ||
          (tag.category === "tech" && showingTechnical) ||
          (tag.category === "ero" && showingSexual) ||
          (tag.category !== "cont" &&
            tag.category !== "tech" &&
            tag.category !== "ero"))
    )
    .filter((tag) => (tag.rating ? parseFloat(tag.rating.toFixed(1)) : 0) > (showFull ? 0 : 2.0))
    .sort((a, b) => (b.rating || 0.0) - (a.rating || 0.0));

  const categoryMap: Record<string, VNTagType[]> = filteredTags.reduce(
    (acc, tag) => {
      if (!acc[tag.category || ""]) {
        acc[tag.category || ""] = [];
      }

      if (acc[tag.category || ""] && acc[tag.category || ""]!.length < 15) {
        acc[tag.category || ""]!.push(tag);
      }

      return acc;
    },
    {} as Record<string, VNTagType[]>
  );

  // Flatten the object back into an array
  const limitedTags: VNTagType[] = Object.values(categoryMap)
    .flat()
    .sort((a, b) => (b.rating || 0.0) - (a.rating || 0.0));

  return (
    <View style={[styles.tagsContainer]}>
      {(showFull
        ? filteredTags
        : expandTags
        ? limitedTags
        : limitedTags.slice(0, MAX_TAGS)
      ).map((tag, index) => (
        <View key={index} style={[styles.tag, THEME.option.primary]}>
          <Text style={[styles.fs13, styles.bold]}>{tag.name}</Text>
          <Text style={[styles.fs10, styles.pl3]}>
            {(tag.rating ?? 0).toFixed(1)}
          </Text>
        </View>
      ))}
      {!showFull && filteredTags.length > MAX_TAGS && (
        <Pressable onPress={toggleTags}>
          <View
            style={[
              styles.tag,
              {
                backgroundColor: hexToRGBA(
                  THEME.option.primary.backgroundColor,
                  0.5
                ),
              },
            ]}
          >
            {!expandTags ? (
              <Text style={[styles.fs13, styles.bold]}>
                {"+" + (limitedTags.length - MAX_TAGS)}
              </Text>
            ) : (
              <Ionicons
                size={20}
                name="chevron-up"
                color={THEME.option.primary.color}
              />
            )}
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
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
    gap: 8,
  },
  tag: {
    borderRadius: 8,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});
