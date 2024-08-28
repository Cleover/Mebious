import React, { useEffect, useMemo, useState } from "react";
import { View, Text, getTheme } from "../../../components/Themed";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import BackNavbar from "@/components/Navbars/BackNavbar";
import ReleaseList from "@/components/Lists/ReleaseList";
import { getReleasesData } from "@/API/Releases";
import type {
  ReleaseDataType,
  ReleaseResponseType,
} from "@/Definitions/ReleaseType";
import type { SchemaType } from "@/Definitions/SchemaType";
import * as DropdownMenu from "zeego/dropdown-menu";
import { Ionicons } from "@expo/vector-icons";

const sorts: {
  id: string;
  label: string;
  value: "title" | "released";
  reverse: boolean;
}[] = [
  {
    id: "title",
    label: "Title A-Z",
    value: "title",
    reverse: false,
  },
  {
    id: "title-reverse",
    label: "Title Z-A",
    value: "title",
    reverse: true,
  },
  {
    id: "released",
    label: "Release Date 0-9",
    value: "released",
    reverse: false,
  },
  {
    id: "released-reverse",
    label: "Release Date 9-0",
    value: "released",
    reverse: true,
  },
];

export default function Releases() {
  const params = useLocalSearchParams();
  const { vnID } = params;

  const [opacity, setOpacity] = useState<number>(1);

  const THEME = getTheme();

  const [filters, setFilters] = useState({
    languages: [] as string[],
    platforms: [] as string[],
  });
  const [sort, setSort] = useState<string>("released");

  const [releasesData, setReleasesData] = useState<ReleaseResponseType | null>(
    null
  );

  const [renderedData, setRenderedData] = useState<ReleaseDataType[]>([]);

  const apiOptions = {
    filters: ["vn", "=", ["id", "=", vnID]],
    fields: ReleasesFields,
    results: 100,
  };

  useEffect(() => {
    getReleasesData(apiOptions, true)
      .then((data: ReleaseResponseType) => {
        setReleasesData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const sortedReleasesData = useMemo(() => {
    let selectedSort = sorts.find((sortItem) => sortItem.id === sort);
    if (!selectedSort)
      selectedSort = {
        id: "released-reverse",
        label: "Release Date 9-0",
        value: "released",
        reverse: true,
      };

    return [...(releasesData ? releasesData.results : [])].sort((a, b) => {
      if (a[selectedSort.value] == null) return 1;
      if (b[selectedSort.value] == null) return -1;
      return selectedSort.reverse
        ? // @ts-ignore
          b[selectedSort.value].localeCompare(a[selectedSort.value])
        : // @ts-ignore
          a[selectedSort.value].localeCompare(b[selectedSort.value]);
    });
  }, [releasesData, sort]);

  useEffect(() => {
    const filteredReleases = sortedReleasesData.filter((release) => {
      const langMatch =
        filters.languages.length === 0 ||
        release.languages?.some((lang) =>
          filters.languages.includes(lang.lang)
        );
      const platformMatch =
        filters.platforms.length === 0 ||
        release.platforms?.some((platform) =>
          filters.platforms.includes(platform)
        );
      return langMatch && platformMatch;
    });
    setRenderedData(filteredReleases);
  }, [sortedReleasesData, filters]);

  const switchState = (type: "languages" | "platforms", item: string) => {
    const newFilters = { ...filters };
    if (newFilters[type].includes(item)) {
      newFilters[type] = newFilters[type].filter((i) => i !== item);
    } else {
      newFilters[type].push(item);
    }
    setFilters(newFilters);
  };

  const generateSortedMap = <T, V>(data: T[], extractor: (item: T) => V[]) => {
    const resultMap = new Map<V, number>();

    data.forEach((item) => {
      extractor(item).forEach((value) => {
        resultMap.set(value, (resultMap.get(value) || 0) + 1);
      });
    });

    return new Map([...resultMap.entries()].sort((a, b) => b[1] - a[1]));
  };

  const supportedLangsSorted = useMemo(
    () =>
      generateSortedMap(releasesData ? releasesData.results : [], (release) =>
        (release.languages ?? []).map((lang) => lang.lang)
      ),
    [releasesData]
  );

  const supportedPlatformsSorted = useMemo(
    () =>
      generateSortedMap(
        releasesData ? releasesData.results : [],
        (release) => release.platforms ?? []
      ),
    [releasesData]
  );

  let languages = ((window as any).schema as SchemaType)?.enums?.language;
  let platforms = ((window as any).schema as SchemaType)?.enums?.platform;

  const getLabel = (list: typeof languages | typeof platforms, id: string) => {
    const label = list.find((item) => item.id === id);
    return label ? label.label : id;
  };

  const generateDropdown = (
    supportedMap: Map<string, number>,
    type: "languages" | "platforms",
    list: typeof languages | typeof platforms
  ) => {
    return (
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          {Array.from(supportedMap).map(([item, key]) => (
            <DropdownMenu.Item
              key={item}
              onSelect={() => {
                switchState(type, item);
              }}
            >
              {`${filters[type].includes(item) ? "✓ " : "    "} ${getLabel(
                list,
                item
              )} (${key})`}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: THEME.backgroundColor }]}
    >
      <ReleaseList
        releasesData={renderedData || []}
        setTopBarOpacity={setOpacity}
        header={
          <View>
            <View style={[styles.row, styles.pb13]}>
              <View style={styles.titleContainer}>
                <View style={[styles.row, { alignItems: "flex-start" }]}>
                  <Text style={[styles.title, styles.bold]}>Releases</Text>
                </View>
              </View>
              <View style={[styles.buttonsContainer]}>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <View style={[styles.box, THEME.option.primary]}>
                      <Ionicons
                        size={20}
                        name="language"
                        color={THEME.option.primary.color}
                        style={styles.boxIcon}
                      />
                    </View>
                  </DropdownMenu.Trigger>

                  {generateDropdown(
                    supportedLangsSorted,
                    "languages",
                    languages
                  )}
                </DropdownMenu.Root>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <View style={[styles.box, THEME.option.primary]}>
                      <Ionicons
                        size={20}
                        name="game-controller"
                        color={THEME.option.primary.color}
                        style={styles.boxIcon}
                      />
                    </View>
                  </DropdownMenu.Trigger>
                  {generateDropdown(
                    supportedPlatformsSorted,
                    "platforms",
                    platforms
                  )}
                </DropdownMenu.Root>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <View style={[styles.box, THEME.option.primary]}>
                      <Ionicons
                        size={20}
                        name="options"
                        color={THEME.option.primary.color}
                        style={styles.boxIcon}
                      />
                    </View>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Group>
                      {sorts.map((sortItem) => (
                        <DropdownMenu.Item
                          key={sortItem.id}
                          onSelect={() => {
                            setSort(sortItem.id);
                          }}
                        >
                          {`${sort == sortItem.id ? "✓ " : "    "} ${
                            sortItem.label
                          }`}
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.Group>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </View>
            </View>
          </View>
        }
        extraHeaderTopPadding={50}
      />

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
  },
  bold: {
    fontWeight: "bold",
  },
  pb13: {
    paddingBottom: 13,
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
  showMoreButtonContainer: {
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  showMoreButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const ReleasesFields = [
  "id",
  "title",
  "alttitle",
  "languages.lang",
  "languages.title",
  "languages.latin",
  "producers.name",
  "platforms",
  "released",
  "minage",
  "patch",
  "official",
  "voiced",
  "resolution",
  "freeware",
  "uncensored",
  "has_ero",
  "notes",
  "media.medium",
  "media.qty",
  "vns.rtype",
  "vns.title",
  "vns.developers.name",
  "gtin",
  "catalog",
  "extlinks.url",
  "extlinks.label",
].join(",");
