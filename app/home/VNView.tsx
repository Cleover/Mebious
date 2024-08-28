import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View, Dimensions } from "react-native";
import { getVisualNovelData } from "@/API/VN";
import { useLocalSearchParams } from "expo-router";
import VNViewHeader from "@/components/Headers/VNView/VNViewHeader";
import VNViewBody from "@/components/Bodys/VNView/VNViewBody";
import type { VNResponseType } from "@/Definitions/VNType";
import { LinearGradient } from "expo-linear-gradient";

import Animated, { clamp, useAnimatedRef } from "react-native-reanimated";
import { Text, getTheme } from "@/components/Themed";
import hexToRGBA from "@/Functions/HexToRGBA";
import { easeGradient } from "react-native-easing-gradient";
import * as DropdownMenu from "zeego/dropdown-menu";
import BackNavbar from "@/components/Navbars/BackNavbar";
import { BlurView } from "expo-blur";
import FormatTime from "@/Functions/FormatTime";

const { height } = Dimensions.get("window");

export default function VNView() {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const [opacity, setOpacity] = useState<number>(1);

  const params = useLocalSearchParams();
  const { vnID } = params;

  const [vnData, setVnData] = useState<VNResponseType | null>(null);
  const [loading, setLoading] = useState(true);

  const apiOptions = {
    filters: ["id", "=", vnID as string],
    fields: VNFields,
  };

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
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        style={[{ backgroundColor: THEME.backgroundColor }]}
        showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          const currentOffset = event.nativeEvent.contentOffset.y;

          const opacity = clamp(((currentOffset - 200) / 200) * -1, 0, 1);
          setOpacity(opacity);
        }}
      >
        <View>
          {loading ? (
            <ActivityIndicator
              style={{ paddingTop: height / 2 }}
              size="large"
              color="#FFFFFF"
            />
          ) : (
            vnData &&
            vnData.results[0] && (
              <>
                <VNViewHeader
                  vnData={vnData.results[0]}
                  scrollRef={scrollRef}
                />
                <VNViewBody vnData={vnData.results[0]} />
              </>
            )
          )}
        </View>
      </Animated.ScrollView>
      <LinearGradient
        colors={colors}
        locations={locations}
        style={[styles.top, styles.gradient, { pointerEvents: "none" }]}
      />
      {!loading && (
        <View
          style={[
            styles.top,
            { opacity, pointerEvents: opacity == 0 ? "none" : "auto" },
          ]}
        >
          <BackNavbar
            rightSideContent={
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <BlurView
                    tint="dark"
                    intensity={10}
                    style={[
                      {
                        backgroundColor: hexToRGBA(THEME.backgroundColor, 0.8),
                        borderColor: hexToRGBA(THEME.color, 0.8),
                        shadowColor: hexToRGBA(THEME.color, 0.8),
                        overflow: "hidden",
                      },
                      styles.outline,
                    ]}
                  >
                    <View>
                      <Text style={styles.lengthText}>
                        {FormatTime(vnData?.results[0]?.length_minutes ?? 0)}
                      </Text>
                    </View>
                  </BlurView>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item key="content" disabled={true}>
                    {`From ${(
                      vnData?.results[0]?.length_votes ?? 0
                    ).toLocaleString()} votes`}
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  top: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  gradient: {
    height: "15%",
  },
  outline: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 3,

    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 0,
  },
  lengthText: {
    padding: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
});

const VNFields = [
  "title",
  "description",
  "rating",
  "votecount",
  "length_minutes",
  "length_votes",
  "aliases",
  "developers.name",
  "image.url",
  "image.sexual",
  "image.violence",
  "tags.id",
  "tags.rating",
  "tags.name",
  "tags.spoiler",
  "tags.category",
  "screenshots.thumbnail",
  "screenshots.thumbnail_dims",
  "screenshots.sexual",
  "screenshots.violence",
  "screenshots.release.title",
  "relations.relation",
  "relations.relation_official",
  "relations.title",
].join(",");
