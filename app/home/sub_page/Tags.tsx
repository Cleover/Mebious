import React, { useMemo, useState } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import * as DropdownMenu from "zeego/dropdown-menu";

import { Background, Box, Icon, View } from "@/components/Themed";
import BackNavbar from "@/components/Navbars/BackNavbar";
import TagsList from "@/components/Tags/TagsList";

import { useFetchVisualNovelData } from "@/Functions/FetchUtils";
import { handleScrollOpacity } from "@/Functions/NavbarUtils";

import { FullVNFields } from "@/constants/Fields";
import SubViewHeader from "@/components/Headers/SubViewHeader";

const spoilerOptions = ["Hide Spoilers", "Minor Spoilers", "Spoil Me!"];

export default function Tags() {
  const [opacity, setOpacity] = useState<number>(1);

  const { vnID } = useLocalSearchParams();

  const insets = useSafeAreaInsets();

  const apiOptions = useMemo(() => {
    return {
      filters: ["id", "=", vnID],
      fields: FullVNFields,
    };
  }, [vnID]);

  const vnData = useFetchVisualNovelData(apiOptions);

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

  const tags = vnData.data?.results[0]?.tags || [];

  const changeSpoiler = (index: number) =>
    setState({ ...state, selectedSpoilerIndex: index });

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

  return (
    <Background className="flex-1">
      {!vnData.loading && vnData.data?.results[0] && (
        <ScrollView
          onScroll={(event) => handleScrollOpacity(event, setOpacity, 50)}
          contentContainerStyle={{ paddingTop: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-4 gap-3" style={{ paddingBottom: insets.bottom }}>
            <SubViewHeader
              title="Tags"
              rightSideContent={
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Box className="rounded-2xl p-2.5">
                      <Icon size={22} name="ellipsis-horizontal" />
                    </Box>
                  </DropdownMenu.Trigger>
                  {/* @ts-expect-error TS2740 */}
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
              }
            />
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
      <BackNavbar opacity={opacity} />
    </Background>
  );
}
