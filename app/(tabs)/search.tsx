import React, { useState } from "react";
import { Pressable } from "react-native";

import * as DropdownMenu from "zeego/dropdown-menu";

import { View, Background, Box, Text, Icon } from "@/components/Themed";
import CoverMasonry from "@/components/Masonry/CoverMasonry";
import SearchBar from "@/components/Inputs/SearchBar";
import TopGradient from "@/components/Gradients/TopGradient";

import { notifyNotImplemented } from "@/Functions/NotifyPopup";
import { useFetchVisualNovelData } from "@/Functions/FetchUtils";

import { CoverVNFields } from "@/constants/Fields";

import type { VNDataType } from "@/Definitions/VNType";
import type { APIType } from "@/Definitions/APIType";

type SortOption = {
  name: string;
  value: string;
  reverse: boolean;
  requireQuery: boolean;
};

const columnOptions = ["1 Row", "2 Rows", "3 Rows", "4 Rows"];
const sortOptions: SortOption[] = [
  {
    name: "Best Match",
    value: "searchrank",
    reverse: false,
    requireQuery: true,
  },
  {
    name: "Most Votes",
    value: "votecount",
    reverse: true,
    requireQuery: false,
  },
  {
    name: "Least Votes",
    value: "votecount",
    reverse: false,
    requireQuery: false,
  },
  {
    name: "Highest Rating",
    value: "rating",
    reverse: true,
    requireQuery: false,
  },
  {
    name: "Lowest Rating",
    value: "rating",
    reverse: false,
    requireQuery: false,
  },
  {
    name: "Newest Release",
    value: "released",
    reverse: true,
    requireQuery: false,
  },
  {
    name: "Oldest Release",
    value: "released",
    reverse: false,
    requireQuery: false,
  },
  {
    name: "Title Ascending",
    value: "title",
    reverse: true,
    requireQuery: false,
  },
  {
    name: "Title Descending",
    value: "title",
    reverse: false,
    requireQuery: false,
  },
];

const DEFAULT_SORT = 1;

const defaultApiOptions = {
  filters: [],
  fields: CoverVNFields,
  sort: "votecount",
  reverse: true,
  results: 100,
};

export default function SearchScreen() {
  const [columnSelection, setColumnSelection] = useState(1);
  const [selectedSort, setSelectedSort] = useState(DEFAULT_SORT);

  const [apiOptions, setApiOptions] = useState<APIType>(defaultApiOptions);

  let vnData = useFetchVisualNovelData(apiOptions);

  const search = (newQuery: string) => {
    const filters = newQuery.length > 0 ? ["search", "=", newQuery] : [];
    const sort = newQuery.length > 0 ? 0 : DEFAULT_SORT;

    if (JSON.stringify(filters) != JSON.stringify(apiOptions.filters)) {
      setSelectedSort(sort);

      setApiOptions((prevState) => ({
        ...prevState,
        filters,
        sort: sortOptions[sort]?.value ?? "votecount",
        reverse: sortOptions[sort]?.reverse ?? true,
      }));
    }
  };

  const dataToShow: VNDataType[] = vnData.data?.results ?? [];

  return (
    <Background>
      <CoverMasonry
        vnsData={dataToShow}
        columnCount={columnSelection + 1}
        header={
          <View className="gap-4">
            <View className="flex-row justify-between items-center gap-4">
              <View className="flex-grow border rounded-full p-1">
                <SearchBar submitted={search} />
              </View>

              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Box className="rounded-2xl p-2.5">
                    <Icon size={30} name="cog-outline" />
                  </Box>
                </DropdownMenu.Trigger>
                {/* @ts-expect-error TS2740 */}
                <DropdownMenu.Content>
                  <DropdownMenu.Group>
                    {columnOptions.map((option, index) => (
                      <DropdownMenu.Item
                        key={option}
                        onSelect={() => {
                          setColumnSelection(index);
                        }}
                        disabled={index === columnSelection}
                      >
                        {`${
                          columnSelection == index ? "✓ " : "    "
                        } ${option}`}
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Group>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </View>

            <View className="flex-row justify-between items-center gap-4">
              <Pressable className="opacity-50" onPress={notifyNotImplemented}>
                <Box className="flex-row items-center rounded-full gap-2 py-3 px-4">
                  <Icon size={20} name="filter" className="text-center" />
                  <Text className="text-lg font-medium">Filters</Text>
                </Box>
              </Pressable>

              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <View className="flex-row items-center justify-between border rounded-full w-56 py-3 px-4">
                    <Text className="text-lg font-medium">
                      {sortOptions[selectedSort]?.name}
                    </Text>
                    <Icon
                      size={20}
                      name="chevron-down"
                      className="text-center"
                    />
                  </View>
                </DropdownMenu.Trigger>
                {/* @ts-expect-error TS2740 */}
                <DropdownMenu.Content>
                  <DropdownMenu.Group>
                    {sortOptions.map((option, index) => (
                      <DropdownMenu.Item
                        key={index.toString()}
                        onSelect={() => {
                          setSelectedSort(index);
                          setApiOptions((prevState) => ({
                            ...prevState,
                            sort: sortOptions[index]?.value ?? "votecount",
                            reverse: sortOptions[index]?.reverse ?? true,
                          }));
                        }}
                        disabled={index === selectedSort}
                        hidden={
                          option.requireQuery &&
                          (apiOptions.filters ?? []).length === 0
                        }
                      >
                        {option.name}
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Group>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </View>
          </View>
        }
        footer={
          <View>
            {dataToShow.length >= 100 && (
              <Text className="self-center">
                Currently only the first 100 results are shown.
              </Text>
            )}
          </View>
        }
        extraHeaderTopPadding={50}
        extraFooterBottomPadding={90}
      />
      <TopGradient />
    </Background>
  );
}
