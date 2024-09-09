import React, { useEffect, useMemo, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import * as DropdownMenu from "zeego/dropdown-menu";

import { Background, Box, Icon } from "@/components/Themed";
import BackNavbar from "@/components/Navbars/BackNavbar";
import SubViewHeader from "@/components/Headers/SubViewHeader";
import ReleaseList from "@/components/Lists/ReleaseList";

import { useFetchReleaseData } from "@/Functions/FetchUtils";

import { FullReleaseFields } from "@/constants/Fields";

import type { ReleaseDataType } from "@/Definitions/ReleaseType";
import type { SchemaType } from "@/Definitions/SchemaType";

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
  const [opacity, setOpacity] = useState<number>(1);
  const [filters, setFilters] = useState({
    languages: [] as string[],
    platforms: [] as string[],
  });
  const [sort, setSort] = useState<string>("released");

  const [renderedData, setRenderedData] = useState<ReleaseDataType[]>([]);

  const { vnID } = useLocalSearchParams();

  const apiOptions = useMemo(() => {
    return {
      filters: ["vn", "=", ["id", "=", vnID]],
      fields: FullReleaseFields,
      results: 100,
    };
  }, [vnID]);

  const releasesData = useFetchReleaseData(apiOptions, true);

  const sortedReleasesData = useMemo(() => {
    let selectedSort = sorts.find((sortItem) => sortItem.id === sort);
    if (!selectedSort)
      selectedSort = {
        id: "released-reverse",
        label: "Release Date 9-0",
        value: "released",
        reverse: true,
      };

    return [...(releasesData.data ? releasesData.data.results : [])].sort(
      (a, b) => {
        if (a[selectedSort.value] == null) return 1;
        if (b[selectedSort.value] == null) return -1;
        return selectedSort.reverse
          ? // @ts-ignore
            b[selectedSort.value].localeCompare(a[selectedSort.value])
          : // @ts-ignore
            a[selectedSort.value].localeCompare(b[selectedSort.value]);
      }
    );
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
      generateSortedMap(releasesData.data?.results ?? [], (release) =>
        (release.languages ?? []).map((lang) => lang.lang)
      ),
    [releasesData]
  );

  const supportedPlatformsSorted = useMemo(
    () =>
      generateSortedMap(
        releasesData.data?.results ?? [],
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
      <>
        {/* @ts-expect-error TS2740 */}
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
      </>
    );
  };

  return (
    <Background className="flex-1">
      <ReleaseList
        releasesData={renderedData}
        setTopBarOpacity={setOpacity}
        header={
          <SubViewHeader
            title="Releases"
            rightSideContent={
              <>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Box className="rounded-2xl p-2.5">
                      <Icon size={22} name="language" />
                    </Box>
                  </DropdownMenu.Trigger>

                  {generateDropdown(
                    supportedLangsSorted,
                    "languages",
                    languages
                  )}
                </DropdownMenu.Root>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Box className="rounded-2xl p-2.5">
                      <Icon size={22} name="game-controller" />
                    </Box>
                  </DropdownMenu.Trigger>
                  {generateDropdown(
                    supportedPlatformsSorted,
                    "platforms",
                    platforms
                  )}
                </DropdownMenu.Root>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Box className="rounded-2xl p-2.5">
                      <Icon size={22} name="options" />
                    </Box>
                  </DropdownMenu.Trigger>
                  {/* @ts-expect-error TS2740 */}
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
              </>
            }
          />
        }
        extraHeaderTopPadding={50}
      />

      <BackNavbar opacity={opacity} />
    </Background>
  );
}
