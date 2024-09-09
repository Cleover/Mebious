import React, { useMemo, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { View, Background, Text } from "@/components/Themed";
import CoverMasonry from "@/components/Masonry/CoverMasonry";
import BackNavbar from "@/components/Navbars/BackNavbar";
import TopGradient from "@/components/Gradients/TopGradient";

import { useFetchReleaseData } from "@/Functions/FetchUtils";
import { releasesToCovers } from "@/Functions/ConvertToCovers";

import { FullReleaseFields } from "@/constants/Fields";

export default function Covers() {
  const [opacity, setOpacity] = useState<number>(1);

  const { vnID } = useLocalSearchParams();

  const apiOptions = useMemo(() => {
    return {
      filters: ["vn", "=", ["id", "=", vnID]],
      fields: FullReleaseFields,
      results: 100,
    };
  }, [vnID]);

  const releasesData = useFetchReleaseData(apiOptions, true);

  const formattedReleaseCovers = releasesToCovers(
    releasesData.data?.results ?? []
  );

  return (
    <Background className="flex-1">
      {releasesData.loading ? (
        <View className="justify-center h-screen">
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      ) : (
        releasesData.data && (
          <>
            <CoverMasonry
              vnsData={formattedReleaseCovers}
              topBarOverwrite={setOpacity}
              extraHeaderTopPadding={35 + 13}
              header={<Text className="text-4xl font-bold">{"Covers"}</Text>}
              footer={
                <View>
                  {releasesData.data.results.length >= 100 && (
                    <Text className="self-center">
                      Currently only the first 100 results are shown.
                    </Text>
                  )}
                </View>
              }
              extraFooterBottomPadding={13}
              renderTitles={false}
              idType={"release"}
            />
          </>
        )
      )}
      <BackNavbar opacity={opacity} />
      <TopGradient />
    </Background>
  );
}
