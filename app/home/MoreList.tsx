import React, { useMemo, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { View, Background, Text } from "@/components/Themed";
import CoverMasonry from "@/components/Masonry/CoverMasonry";
import BackNavbar from "@/components/Navbars/BackNavbar";

import { useFetchVisualNovelData } from "@/Functions/FetchUtils";

export default function MoreList() {
  const [opacity, setOpacity] = useState<number>(1);

  const { headerTitle, apiOptions } = useLocalSearchParams();

  const parsedApiOptions = useMemo(() => {
    return JSON.parse(apiOptions as string);
  }, [apiOptions]);

  const vnData = useFetchVisualNovelData(parsedApiOptions);

  return (
    <Background>
      {vnData.loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        vnData.data && (
          <>
            <CoverMasonry
              vnsData={vnData.data.results}
              topBarOverwrite={setOpacity}
              extraHeaderTopPadding={35 + 13}
              header={<Text className="text-4xl font-bold">{headerTitle}</Text>}
              footer={
                <View>
                  {vnData.data.results.length >= 100 && (
                    <Text className="self-center">
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
      <BackNavbar opacity={opacity} />
    </Background>
  );
}
