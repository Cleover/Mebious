import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { getVisualNovelData } from "@/API/VN";
import { useLocalSearchParams } from "expo-router";
import VNViewHeader from "@/components/Headers/VNView/VNViewHeader";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import VNViewBody from "@/components/Bodys/VNView/VNViewBody";
import type { VNResponseType } from "@/Definitions/VNType";
import { getTheme } from "@/components/Themed";

export default function VNView() {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const params = useLocalSearchParams();
  const { vnID } = params;

  const [vnData, setVnData] = useState<VNResponseType | null>(null);
  const [loading, setLoading] = useState(true);

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

  const THEME = getTheme();

  return (
    <Animated.ScrollView
      ref={scrollRef}
      scrollEventThrottle={10}
      style={[styles.container, { backgroundColor: THEME.backgroundColor }]}
      showsVerticalScrollIndicator={false}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        vnData &&
        vnData.results[0] && (
          <>
            <VNViewHeader vnData={vnData.results[0]} scrollRef={scrollRef} />
            <VNViewBody vnData={vnData.results[0]} />
          </>
        )
      )}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  "screenshots.sexual",
  "screenshots.violence",
  "screenshots.release.title",
  "relations.relation",
  "relations.relation_official",
  "relations.title",
].join(",");
