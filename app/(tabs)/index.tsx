import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { getVisualNovelData } from "@/API/VN";
import type { VNResponseType } from "@/Definitions/VNType";
import { getTheme } from "@/components/Themed";
import { View, Text } from "@/components/Themed";

import Animated, { clamp, useAnimatedRef } from "react-native-reanimated";
import HomeHeader from "@/components/Headers/HomeHeader";
import { LinearGradient } from "expo-linear-gradient";
import hexToRGBA from "@/Functions/HexToRGBA";
import CoverCarousel from "@/components/Carousels/CoverCarousel";
import { easeGradient } from "react-native-easing-gradient";
import { Link } from "expo-router";

export default function HomeScreen() {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const [vnDataHeader, setVnDataHeader] = useState<VNResponseType | null>(null);
  const [loadingHeader, setLoadingHeader] = useState(true);

  const [vnDataRating, setVnDataRating] = useState<VNResponseType | null>(null);
  const [loadingRating, setLoadingRating] = useState(true);

  const [vnDataVotecount, setVnDataVotecount] = useState<VNResponseType | null>(
    null
  );
  const [loadingVotecount, setLoadingVotecount] = useState(true);

  const apiOptionsHeader = {
    filters: [
      "and",
      ["votecount", ">=", "5000"],
      ["rating", ">=", "80"],
      ["release", "=", ["and", ["minage", "<=", "16"]]],
    ],
    fields: VNFields,
    sort: "votecount",
    reverse: true,
    results: 10,
  };

  const apiOptionsRating = {
    fields: VNFields,
    sort: "rating",
    reverse: true,
    results: 10,
  };

  const apiOptionsVotecount = {
    fields: VNFields,
    sort: "votecount",
    reverse: true,
    results: 10,
  };

  useEffect(() => {
    getVisualNovelData(apiOptionsHeader, false)
      .then((data: VNResponseType) => {
        setVnDataHeader(data);
        setLoadingHeader(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoadingHeader(false);
      });

    getVisualNovelData(apiOptionsRating, false)
      .then((data: VNResponseType) => {
        setVnDataRating(data);
        setLoadingRating(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoadingRating(false);
      });

    getVisualNovelData(apiOptionsVotecount, false)
      .then((data: VNResponseType) => {
        setVnDataVotecount(data);
        setLoadingVotecount(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoadingVotecount(false);
      });
  }, []);

  const THEME = getTheme();

  const { colors, locations } = easeGradient({
    colorStops: {
      0: {
        color: hexToRGBA(THEME.backgroundColor, 0.75),
      },
      1: {
        color: "transparent",
      },
    },
  });

  return (
    <View
      style={[styles.container, { backgroundColor: THEME.backgroundColor }]}
    >
      <Animated.ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          const currentOffset = event.nativeEvent.contentOffset.y;

          const opacity = clamp(((currentOffset - 150) / 150) * -1, 0, 1);
          (window as any).setTopBarOpacity(opacity);
        }}
      >
        {loadingRating && loadingVotecount ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          vnDataHeader &&
          vnDataRating &&
          vnDataVotecount && (
            <>
              <HomeHeader
                vnData={vnDataHeader.results}
                scrollRef={scrollRef}
              />
              <View style={[styles.row, styles.between]}>
                <Text style={styles.sectionText}>Highest Rated</Text>
                <View style={styles.row}>
                  <Link
                    href={{
                      pathname: "/home/MoreList",
                      params: {
                        headerTitle: "Highest Rated",
                        fields: VNFields,
                        sort: "rating",
                        results: 100,
                        reverse: "yes",
                      },
                    }}
                    asChild
                  >
                    <Pressable style={{ paddingVertical: 10, paddingLeft: 20 }}>
                      <Text style={styles.viewMore}>{"View More ->"}</Text>
                    </Pressable>
                  </Link>
                </View>
              </View>
              <CoverCarousel
                vnsData={vnDataRating.results.slice(0, 10)}
                height={240}
              />

              <View style={[styles.row, styles.between]}>
                <Text style={styles.sectionText}>Most Votes</Text>
                <View style={styles.row}>
                  <Link
                    href={{
                      pathname: "/home/MoreList",
                      params: {
                        headerTitle: "Most Votes",
                        fields: VNFields,
                        sort: "votecount",
                        results: 100,
                        reverse: "yes",
                      },
                    }}
                    asChild
                  >
                    <Pressable style={{ paddingVertical: 10, paddingLeft: 20 }}>
                      <Text style={styles.viewMore}>{"View More ->"}</Text>
                    </Pressable>
                  </Link>
                </View>
              </View>
              <CoverCarousel
                vnsData={vnDataVotecount.results.slice(0, 10)}
                height={240}
              />
            </>
          )
        )}
        <View style={{ paddingBottom: 90 }} />
      </Animated.ScrollView>
      <LinearGradient
        colors={colors}
        locations={locations}
        style={[styles.topGradient, { pointerEvents: "none" }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingLeft: 20,
    fontSize: 30,
    fontWeight: "bold",
    paddingVertical: 20,
  },
  title: {
    paddingLeft: 20,
    fontSize: 25,
    fontWeight: "bold",
    paddingVertical: 20,
  },
  sectionText: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 13,
  },
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "15%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewMore: {
    fontSize: 15,
    paddingRight: 13,
  },
  between: {
    justifyContent: "space-between",
  },
  pr13: {
    paddingRight: 13,
  },
});

const VNFields = ["title", "image.url", "image.sexual", "image.violence"].join(
  ","
);
