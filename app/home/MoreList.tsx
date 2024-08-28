import React, { useEffect, useState } from "react";
import { View, Text, getTheme } from "../../components/Themed";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, ActivityIndicator } from "react-native";
import { getVisualNovelData } from "@/API/VN";
import type { VNResponseType } from "@/Definitions/VNType";
import CoverMasonry from "@/components/Masonry/CoverMasonry";
import BackNavbar from "@/components/Navbars/BackNavbar";

export default function MoreList() {
  const params = useLocalSearchParams();

  const [vnsData, setVnsData] = useState<VNResponseType | null>(null);
  const [loading, setLoading] = useState(true);
  const [opacity, setOpacity] = useState<number>(1);

  const THEME = getTheme();

  let headerTitle = "";

  if (typeof params["headerTitle"] === "string") {
    headerTitle = params["headerTitle"];
  }

  if (
    typeof params["fields"] === "string" &&
    typeof params["sort"] === "string" &&
    typeof params["results"] === "string"
  ) {
    const { fields, sort, results, reverse } = params;

    const apiOptions = {
      fields,
      sort,
      results: parseInt(results),
      reverse: reverse ? true : false,
    };

    useEffect(() => {
      getVisualNovelData(apiOptions, false)
        .then((data: VNResponseType) => {
          setVnsData(data);
          data;
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }, []);

    // Your component logic
  } else {
    // Handle the error case
    console.error("Params don't have the expected structure");
  }

  return (
    <View
      style={[styles.container, { backgroundColor: THEME.backgroundColor }]}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        vnsData && (
          <>
            <CoverMasonry
              vnsData={vnsData.results}
              setTopBarOpacity={setOpacity}
              extraHeaderTopPadding={35+13}
              header={<Text style={styles.sectionText}>{headerTitle}</Text>}
              footer={
                <View>
                  {vnsData.results.length >= 100 && (
                    <Text style={{ paddingTop: 13, alignSelf: "center" }}>
                      Currently only the first 100 results are shown.
                    </Text>
                  )}
                </View>
              }
              extraFooterBottomPadding={13}
            />
          </>
        )
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
  },
  top: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  sectionText: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 13,
  },
});
