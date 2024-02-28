import React, { useEffect, useState } from "react";
import { View, getTheme } from "../../Themed";
import { StyleSheet, ActivityIndicator } from "react-native";

import SegmentedControl from "@react-native-segmented-control/segmented-control";
import VNViewBodyGeneral from "./(tabs)/VNViewBodyGeneral";
import VNViewBodyReleases from "./(tabs)/VNViewBodyReleases";
import VNViewBodyRelations from "./(tabs)/VNViewBodyRelations";
import { getReleasesData } from "@/API/Releases";
import type { ReleaseResponseType } from "@/Definitions/ReleaseType";
import type { VNDataType } from "@/Definitions/VNType";

export default function VNViewBody({ vnData }: { vnData: VNDataType }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [releasesData, setReleasesData] = useState<ReleaseResponseType | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const apiOptions = {
    filters: ["vn", "=", ["id", "=", vnData.id]],
    fields: ReleasesFields,
    results: 100,
  };

  useEffect(() => {
    getReleasesData(apiOptions, true)
      .then((data: ReleaseResponseType) => {
        setReleasesData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const THEME = getTheme();

  return (
    <View style={styles.container}>
      <View style={styles.ph20}>
        <SegmentedControl
          values={["General", "Releases", "Relations"]}
          selectedIndex={selectedIndex}
          onChange={(event) =>
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
          }
          tintColor={THEME.option.primary.backgroundColor}
          fontStyle={{ color: THEME.color }}
        />
      </View>

      {selectedIndex == 0 ? (
        <VNViewBodyGeneral vnData={vnData} />
      ) : selectedIndex == 1 ? (
        loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          releasesData &&
          releasesData.results && (
            <>
              <VNViewBodyReleases releasesData={releasesData.results} />
            </>
          )
        )
      ) : (
        <VNViewBodyRelations vnData={vnData} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    width: "100%",
  },
  ph20: {
    paddingHorizontal: 20,
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
