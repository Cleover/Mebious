import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { getVisualNovelData } from "@/API/VN";
import type { VNDataType, VNResponseType } from "@/Definitions/VNType";
import { getTheme } from "@/components/Themed";
import { Text, View } from "@/components/Themed";
import CoverMasonry from "@/components/Masonry/CoverMasonry";
import SearchBar from "@/components/Inputs/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import hexToRGBA from "@/Functions/HexToRGBA";
import * as DropdownMenu from "zeego/dropdown-menu";
import { notifyNotImplemented } from "@/Functions/NotifyPopup";

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

// "Highest Rated", "Release Date", "4 Rows"

const DEFAULT_SORT = 1;

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [columnSelection, setColumnSelection] = useState(1);

  const [vnData, setVnData] = useState<VNResponseType | null>(null);
  const [defaultVnData, setDefaultVnData] = useState<VNResponseType | null>(
    null
  );

  const [loadingSearch, setLoadingSearch] = useState(true);

  const [selectedSort, setSelectedSort] = useState(DEFAULT_SORT);

  const searchFilter = ["search", "=", query];

  const apiOptions = {
    filters: searchFilter ? searchFilter : [],
    fields: VNFields,
    sort: sortOptions[selectedSort]?.value || "votecount",
    reverse: sortOptions[selectedSort]?.reverse || false,
    results: 100,
  };

  const search = (newQuery: string) => {
    setQuery(newQuery);
    if (newQuery == "") {
      setSelectedSort(DEFAULT_SORT);
    } else {
      setSelectedSort(0);
      setLoadingSearch(true);
    }
  };

  const fetchVNData = () => {
    getVisualNovelData(apiOptions, false)
      .then((data: VNResponseType) => {
        setVnData(data);
        setLoadingSearch(false);
        if (!defaultVnData) {
          setDefaultVnData(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoadingSearch(false);
      });
  };

  useEffect(() => {
    if (loadingSearch == true) {
      fetchVNData();
    }
  }, [loadingSearch]);

  const THEME = getTheme();

  const setTopBarOpacity = (opacity: number) => {
    (window as any).setTopBarOpacity(opacity);
  };

  const dataToShow: VNDataType[] =
    vnData && defaultVnData
      ? loadingSearch
        ? []
        : query == ""
        ? selectedSort == DEFAULT_SORT
          ? defaultVnData.results
          : vnData.results
        : vnData.results
      : [];

  return (
    <View
      style={[styles.container, { backgroundColor: THEME.backgroundColor }]}
    >
      <CoverMasonry
        vnsData={dataToShow}
        setTopBarOpacity={setTopBarOpacity}
        columnCount={columnSelection + 1}
        header={
          <View>
            <View style={[styles.row, styles.gap13, styles.pb13]}>
              <View
                style={[
                  {
                    backgroundColor: hexToRGBA(THEME.backgroundColor, 0.8),
                    borderColor: hexToRGBA(
                      THEME.option.primary.backgroundColor,
                      0.8
                    ),
                    overflow: "hidden",
                  },
                  styles.outline,
                  styles.grow,
                ]}
              >
                <SearchBar submitted={search} />
              </View>

              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <View style={[styles.box, THEME.option.secondary]}>
                    <Ionicons
                      size={30}
                      name="cog-outline"
                      color={THEME.option.secondary.color}
                      style={styles.boxIcon}
                    />
                  </View>
                </DropdownMenu.Trigger>
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

            <View
              style={[
                styles.row,
                styles.spaceBetween,
                styles.gap13,
                styles.pb13,
              ]}
            >
              <Pressable
                style={{ opacity: 0.5 }}
                onPress={notifyNotImplemented}
              >
                <View
                  style={[
                    styles.row,
                    styles.box,
                    styles.gap6half,
                    styles.ph13,
                    { width: "auto" },
                    THEME.option.secondary,
                  ]}
                >
                  <Ionicons
                    size={20}
                    name="filter"
                    color={THEME.option.secondary.color}
                    style={styles.boxIcon}
                  />
                  <Text style={styles.buttonText}>Filters</Text>
                </View>
              </Pressable>

              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <View
                    style={[
                      {
                        backgroundColor: hexToRGBA(THEME.backgroundColor, 0.8),
                        borderColor: hexToRGBA(
                          THEME.option.primary.backgroundColor,
                          0.8
                        ),
                        overflow: "hidden",
                      },
                      styles.outline,
                      { justifyContent: "center", height: 45 },
                    ]}
                  >
                    <View
                      style={[
                        styles.row,
                        styles.spaceBetween,
                        styles.gap6half,
                        styles.ph13,
                        { width: 200 },
                      ]}
                    >
                      <Text style={styles.buttonText}>
                        {sortOptions[selectedSort]?.name}
                      </Text>
                      <Ionicons
                        size={20}
                        name="chevron-down"
                        color={THEME.option.secondary.color}
                        style={styles.boxIcon}
                      />
                    </View>
                  </View>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Group>
                    {sortOptions.map((option, index) => (
                      <DropdownMenu.Item
                        key={index.toString()}
                        onSelect={() => {
                          setSelectedSort(index);

                          if (!(index == DEFAULT_SORT && query == "")) {
                            setLoadingSearch(true);
                          }
                        }}
                        disabled={index === selectedSort}
                        hidden={option.requireQuery && query == ""}
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
              <Text style={{paddingTop: 13, alignSelf: "center"}}>Currently only the first 100 results are shown.</Text>
            )}
          </View>
        }
        extraHeaderTopPadding={50}
        extraFooterBottomPadding={90}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  pb13: {
    paddingBottom: 13,
  },
  outline: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  gap13: {
    gap: 13,
  },
  gap6half: {
    gap: 6.5,
  },
  ph13: {
    paddingHorizontal: 13,
  },
  grow: {
    flexGrow: 1,
  },
  box: {
    borderRadius: 20,
    height: 45,
    width: 45,
    justifyContent: "center",
  },
  boxIcon: {
    textAlign: "center",
  },
  buttonText: {
    fontWeight: "500",
    fontSize: 16,
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
});

const VNFields = ["title", "image.url", "image.sexual", "image.violence"].join(
  ","
);
