import React, { useState } from "react";
import { View, Text, getTheme } from "../../../Themed";
import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DropdownMenu from "zeego/dropdown-menu";
import type { VNDataType } from "@/Definitions/VNType";
import ScreenshotCarousel from "@/components/Carousels/ScreenshotCarousel";
import hexToRGBA from "@/Functions/HexToRGBA";
import groupScreenshotsByTitle from "@/Functions/GroupById";

const spoilerOptions = ["Hide Spoilers", "Minor Spoilers", "Spoil Me!"];
const summaryOptions = ["Summary", "All"];

const MAX_TAGS = 8;

export default function VNViewBodyGeneral({ vnData }: { vnData: VNDataType }) {
  const THEME = getTheme();

  const [state, setState] = useState({
    expandDescription: false,
    expandTags: false,
    selectedSpoilerIndex: 0,
    selectedSummaryIndex: 0,
    showingContent: true,
    showingSexual: false,
    showingTechnical: true,
  });

  const {
    expandDescription,
    expandTags,
    selectedSpoilerIndex,
    selectedSummaryIndex,
    showingContent,
    showingSexual,
    showingTechnical,
  } = state;

  const toggleDescription = () =>
    setState({ ...state, expandDescription: !expandDescription });
  const toggleTags = () => setState({ ...state, expandTags: !expandTags });

  const changeSpoiler = (index: number) =>
    setState({ ...state, selectedSpoilerIndex: index });
  const changeSummary = (index: number) =>
    setState({ ...state, selectedSummaryIndex: index });

  const { tags = [] } = vnData;

  const noSpoilersCount = tags.filter((tag) => (tag.spoiler || 0) === 0).length;
  const minorSpoilersCount = tags.filter(
    (tag) => (tag.spoiler || 0) === 1
  ).length;
  const majorSpoilersCount = tags.filter(
    (tag) => (tag.spoiler || 0) === 2
  ).length;

  const summaryCount = tags.filter((tag) => (tag.rating || 0) >= 2.0).length;
  const allCount = tags.length;

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
    .filter((tag) =>
      selectedSummaryIndex === 0 ? (tag.rating || 0) >= 2.0 : true
    )
    .sort((a, b) => (b.rating || 0.0) - (a.rating || 0.0));

  const limitedTags = filteredTags.slice(0, MAX_TAGS);

  const contentGroups = [
    {
      key: "content",
      name: "Content",
      count: tags.filter((tag) => tag.category === "cont").length,
      showing: showingContent,
      toggle: () => setState({ ...state, showingContent: !showingContent }),
    },
    {
      key: "sexual",
      name: "Sexual",
      count: tags.filter((tag) => tag.category === "ero").length,
      showing: showingSexual,
      toggle: () => setState({ ...state, showingTechnical: !showingTechnical }),
    },
    {
      key: "technical",
      name: "Technical",
      count: tags.filter((tag) => tag.category === "tech").length,
      showing: showingTechnical,
      toggle: () => setState({ ...state, showingTechnical: !showingTechnical }),
    },
  ];

  return (
    <View>
      <View style={[styles.ph20]}>
        <Text style={[styles.title, styles.bold, styles.pt20]}>
          Description
        </Text>
        <Text
          numberOfLines={expandDescription ? undefined : 3}
          style={[styles.pt10]}
        >
          {vnData.description}
        </Text>
        <Pressable onPress={toggleDescription}>
          <Text
            style={[
              styles.readStyle,
              { color: hexToRGBA(THEME.option.primary.backgroundColor, 0.8) },
            ]}
          >
            {expandDescription ? "Read Less" : "Read More"}
          </Text>
        </Pressable>
        <View style={[styles.row, styles.pt20]}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, styles.bold]}>Tags</Text>
          </View>
          <View style={[styles.buttonsContainer]}>
            <Pressable onPress={toggleTags}>
              <View style={[styles.box, THEME.option.primary]}>
                <Ionicons
                  size={20}
                  name={expandTags ? "chevron-down" : "chevron-up"}
                  color={THEME.option.primary.color}
                  style={styles.boxIcon}
                />
              </View>
            </Pressable>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <View style={[styles.box, THEME.option.primary]}>
                  <Ionicons
                    size={20}
                    name="ellipsis-horizontal"
                    color={THEME.option.primary.color}
                    style={styles.boxIcon}
                  />
                </View>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Group>
                  {contentGroups.map((group) =>
                    group.count === 0 ? null : (
                      <DropdownMenu.Item
                        key={group.key}
                        onSelect={() => {
                          group.toggle();
                        }}
                        disabled={group.count === 0}
                      >
                        {`    ${group.showing ? "Hide" : "Show"} ${
                          group.name
                        } (${group.count})`}
                      </DropdownMenu.Item>
                    )
                  )}
                </DropdownMenu.Group>

                <DropdownMenu.Group>
                  {spoilerOptions.map((option, index) =>
                    (index === 0
                      ? noSpoilersCount
                      : index === 1
                      ? minorSpoilersCount
                      : majorSpoilersCount) === 0 ? null : (
                      <DropdownMenu.Item
                        key={option}
                        onSelect={() => {
                          changeSpoiler(index);
                        }}
                        disabled={index === selectedSpoilerIndex}
                      >
                        {`${
                          selectedSpoilerIndex == index ? "✓ " : "    "
                        } ${option} (+${
                          index === 0
                            ? noSpoilersCount
                            : index === 1
                            ? minorSpoilersCount
                            : majorSpoilersCount
                        })`}
                      </DropdownMenu.Item>
                    )
                  )}
                </DropdownMenu.Group>

                <DropdownMenu.Group>
                  {summaryOptions.map((option, index) => (
                    <DropdownMenu.Item
                      key={option}
                      onSelect={() => {
                        changeSummary(index);
                      }}
                      disabled={index === selectedSummaryIndex}
                    >
                      {`${
                        selectedSummaryIndex == index ? "✓ " : "    "
                      } ${option} (${index === 0 ? summaryCount : allCount})`}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Group>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </View>
        </View>
        <View style={[styles.tagsContainer, styles.pt20]}>
          {(expandTags ? filteredTags : limitedTags).map((tag, index) => (
            <View key={index} style={[styles.tag, THEME.option.primary]}>
              <Text style={[styles.fs13, styles.bold]}>{tag.name}</Text>
              <Text style={[styles.fs10, styles.pl3]}>
                {(tag.rating ?? 0).toFixed(1)}
              </Text>
            </View>
          ))}

          {!expandTags && filteredTags.length > MAX_TAGS && (
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
                <Text style={[styles.fs13, styles.bold]}>
                  {"+" + (filteredTags.length - MAX_TAGS)}
                </Text>
              </View>
            </Pressable>
          )}
        </View>
      </View>
      {vnData.screenshots && vnData.screenshots.length > 0 && (
        <ScreenshotCarousel
          groupedScreenshots={groupScreenshotsByTitle(vnData.screenshots)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
  bold: {
    fontWeight: "bold",
  },
  ph20: {
    paddingHorizontal: 20,
  },
  pt10: {
    paddingTop: 10,
  },
  pt20: {
    paddingTop: 20,
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
  },
  tag: {
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
  titleContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
});