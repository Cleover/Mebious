import React from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { Link } from "expo-router";

import Animated, { useAnimatedRef } from "react-native-reanimated";

import { Background, Text, View } from "@/components/Themed";
import CoverCarousel from "@/components/Carousels/CoverCarousel";
import HomeHeader from "@/components/Headers/HomeHeader";
import TopGradient from "@/components/Gradients/TopGradient";

import { handleScrollOpacity } from "@/Functions/NavbarUtils";
import { useFetchVisualNovelData } from "@/Functions/FetchUtils";

import { CoverVNFields } from "@/constants/Fields";

import type { APIType } from "@/Definitions/APIType";

const apiOptionsHeader: APIType = {
  filters: [
    "and",
    ["votecount", ">=", "5000"],
    ["rating", ">=", "80"],
    ["release", "=", ["and", ["minage", "<=", "16"]]],
  ],
  fields: CoverVNFields,
  sort: "votecount",
  reverse: true,
  results: 100,
};

const apiOptionsRating: APIType = {
  filters: [],
  fields: CoverVNFields,
  sort: "rating",
  reverse: true,
  results: 100,
};

const apiOptionsVotecount: APIType = {
  filters: [],
  fields: CoverVNFields,
  sort: "votecount",
  reverse: true,
  results: 100,
};

export default function HomeScreen() {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const headerState = useFetchVisualNovelData(apiOptionsHeader);
  const ratingState = useFetchVisualNovelData(apiOptionsRating);
  const votecountState = useFetchVisualNovelData(apiOptionsVotecount);

  const isLoading =
    headerState.loading || ratingState.loading || votecountState.loading;

  return (
    <Background className="flex-1">
      <Animated.ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        onScroll={handleScrollOpacity}
      >
        <View className="pb-28">
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View className="gap-4">
              {headerState.data && (
                <HomeHeader
                  vnData={headerState.data.results}
                  scrollRef={scrollRef}
                />
              )}

              {ratingState.data && (
                <>
                  <View className="flex-row justify-between items-center px-4">
                    <Text className="text-2xl font-bold">Highest Rated</Text>
                    <Link
                      href={{
                        pathname: "/home/MoreList",
                        params: {
                          headerTitle: "Highest Rated",
                          apiOptions: JSON.stringify(apiOptionsRating),
                        },
                      }}
                      asChild
                    >
                      <Pressable>
                        <Text className="text-lg">{"View More ->"}</Text>
                      </Pressable>
                    </Link>
                  </View>
                  <CoverCarousel
                    vnsData={ratingState.data.results.slice(0, 10)}
                    height={240}
                  />
                </>
              )}

              {votecountState.data && (
                <>
                  <View className="flex-row justify-between items-center px-4">
                    <Text className="text-2xl font-bold">Most Votes</Text>
                    <Link
                      href={{
                        pathname: "/home/MoreList",
                        params: {
                          headerTitle: "Most Votes",
                          apiOptions: JSON.stringify(apiOptionsVotecount),
                        },
                      }}
                      asChild
                    >
                      <Pressable>
                        <Text className="text-lg">{"View More ->"}</Text>
                      </Pressable>
                    </Link>
                  </View>
                  <CoverCarousel
                    vnsData={votecountState.data.results.slice(0, 10)}
                    height={240}
                  />
                </>
              )}
            </View>
          )}
        </View>
      </Animated.ScrollView>
      <TopGradient />
    </Background>
  );
}
