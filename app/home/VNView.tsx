import React, { useMemo, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { BlurView } from "expo-blur";

import Animated, { useAnimatedRef } from "react-native-reanimated";
import * as DropdownMenu from "zeego/dropdown-menu";

import { Background, Text, getTheme } from "@/components/Themed";
import VNViewHeader from "@/components/Headers/VNView/VNViewHeader";
import VNViewBody from "@/components/Bodys/VNView/VNViewBody";
import BackNavbar from "@/components/Navbars/BackNavbar";
import TopGradient from "@/components/Gradients/TopGradient";

import hexToRGBA from "@/Functions/HexToRGBA";
import FormatTime from "@/Functions/FormatTime";
import { handleScrollOpacity } from "@/Functions/NavbarUtils";
import { useFetchVisualNovelData } from "@/Functions/FetchUtils";

import { FullVNFields } from "@/constants/Fields";

export default function VNView() {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const [opacity, setOpacity] = useState<number>(1);

  const { vnID } = useLocalSearchParams();

  const apiOptions = useMemo(() => {
    return {
      filters: ["id", "=", vnID],
      fields: FullVNFields,
    };
  }, [vnID]);

  const vnData = useFetchVisualNovelData(apiOptions);

  const THEME = getTheme();

  return (
    <Background>
      <Animated.ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        onScroll={(event) => handleScrollOpacity(event, setOpacity)}
      >
        <>
          {vnData.loading ? (
            <View className="justify-center h-screen">
              <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
          ) : (
            vnData.data?.results[0] && (
              <>
                <VNViewHeader
                  vnData={vnData.data.results[0]}
                  scrollRef={scrollRef}
                />
                <VNViewBody vnData={vnData.data.results[0]} />
              </>
            )
          )}
        </>
      </Animated.ScrollView>
      <TopGradient />
      {!vnData.loading && vnData.data?.results[0] && (
        <BackNavbar
          rightSideContent={
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <BlurView
                  tint="dark"
                  intensity={10}
                  className="border rounded-full overflow-hidden py-2.5 px-3.5"
                  style={[
                    {
                      backgroundColor: hexToRGBA(THEME.backgroundColor, 0.8),
                      borderColor: hexToRGBA(THEME.color, 0.8),
                    },
                  ]}
                >
                  <View>
                    <Text className="font-bold text-lg">
                      {FormatTime(vnData.data.results[0].length_minutes ?? 0)}
                    </Text>
                  </View>
                </BlurView>
              </DropdownMenu.Trigger>
              {/* @ts-expect-error TS2740 */}
              <DropdownMenu.Content>
                <DropdownMenu.Item key="content" disabled={true}>
                  {`From ${(
                    vnData.data.results[0].length_votes ?? 0
                  ).toLocaleString()} votes`}
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          }
          opacity={opacity}
        />
      )}
    </Background>
  );
}