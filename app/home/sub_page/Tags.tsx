import React, { useEffect, useState } from "react";
import { Text, View, getTheme } from "../../../components/Themed";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, ScrollView } from "react-native";
import BackNavbar from "@/components/Navbars/BackNavbar";
import { clamp } from "react-native-reanimated";
import { getVisualNovelData } from "@/API/VN";
import type { VNResponseType } from "@/Definitions/VNType";
import TagsList from "@/components/Tags/TagsList";
import * as DropdownMenu from "zeego/dropdown-menu";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const spoilerOptions = ["Hide Spoilers", "Minor Spoilers", "Spoil Me!"];

export default function Tags() {
  const params = useLocalSearchParams();
  const { vnID } = params;

  const insets = useSafeAreaInsets();

  const [opacity, setOpacity] = useState<number>(1);

  const [vnData, setVnData] = useState<VNResponseType | null>(null);
  const [loading, setLoading] = useState(true);

  const [state, setState] = useState({
    selectedSpoilerIndex: 0,
    showingContent: true,
    showingSexual: false,
    showingTechnical: true,
  });

  const {
    selectedSpoilerIndex,
    showingContent,
    showingSexual,
    showingTechnical,
  } = state;

  const tags = vnData?.results[0]?.tags || [];

  const changeSpoiler = (index: number) =>
    setState({ ...state, selectedSpoilerIndex: index });

  const THEME = getTheme();

  const noSpoilersCount = tags.filter((tag) => (tag.spoiler || 0) === 0).length;
  const minorSpoilersCount = tags.filter(
    (tag) => (tag.spoiler || 0) === 1
  ).length;
  const majorSpoilersCount = tags.filter(
    (tag) => (tag.spoiler || 0) === 2
  ).length;

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
      toggle: () => setState({ ...state, showingSexual: !showingSexual }),
    },
    {
      key: "technical",
      name: "Technical",
      count: tags.filter((tag) => tag.category === "tech").length,
      showing: showingTechnical,
      toggle: () => setState({ ...state, showingTechnical: !showingTechnical }),
    },
  ];

  const apiOptions = {
    filters: ["id", "=", vnID as string],
    fields: VNFields,
  };

  useEffect(() => {
    getVisualNovelData(apiOptions, false)
      .then((data: VNResponseType) => {
        setVnData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: THEME.backgroundColor }]}
    >
      {!loading && vnData?.results[0] && (
        <ScrollView
          onScroll={(event) => {
            const currentOffset = event.nativeEvent.contentOffset.y;

            const opacity = clamp(((currentOffset - 50) / 50) * -1, 0, 1);
            setOpacity(opacity);
          }}
        >
          <View style={{ paddingTop: 100, paddingBottom: insets.bottom }}>
            <View style={styles.row}>
              <Text style={styles.title}>Tags</Text>

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
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </View>
            <TagsList
              showFull={true}
              tags={tags}
              selectedSpoilerIndex={selectedSpoilerIndex}
              showingContent={showingContent}
              showingSexual={showingSexual}
              showingTechnical={showingTechnical}
            />
          </View>
        </ScrollView>
      )}

      <View
        style={[
          styles.top,
          { opacity, pointerEvents: opacity == 0 ? "none" : "auto" },
        ]}
      >
        <BackNavbar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 13,
  },
  top: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    paddingBottom: 13,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
});

const VNFields = [
  "tags.id",
  "tags.rating",
  "tags.name",
  "tags.spoiler",
  "tags.category",
].join(",");
