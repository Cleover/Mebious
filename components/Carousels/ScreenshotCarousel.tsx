import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";

import { View, Text } from "@/components/Themed";
import type { VNScreenshotType } from "@/Definitions/VNType";
import PagerView from "react-native-pager-view";

import * as DropdownMenu from "zeego/dropdown-menu";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const screensSpaceImageHeight = (width - 13 * 2) * (9 / 16);

const blurhash = "CEN]Rv-WPn^N}SQ[VFNF";

export default function ScreenshotCarousel({
  groupedScreenshots,
}: {
  groupedScreenshots: { [name: string]: VNScreenshotType[] };
}) {
  const [selectedReleaseIndex, setSelectedReleaseIndex] = useState(0);
  const fadeAnim = useSharedValue(1);

  let keysArray = Object.keys(groupedScreenshots);
  let selectedRelease = groupedScreenshots[keysArray[selectedReleaseIndex]!];

  const fullSize = selectedRelease!.map((screenshot) =>
    screenshot.thumbnail?.replace("/sf.t/", "/sf/")
  );

  const selectRelease = (index: number) => {
    fadeAnim.value = 0;
    setTimeout(() => {
      setSelectedReleaseIndex(index);
      fadeAnim.value = 1;
    }, 110);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(fadeAnim.value, {
        duration: 100,
        easing: Easing.ease,
      }),
    };
  });

  return (
    <View>
      <Animated.View style={[animatedStyle]}>
        <PagerView
          key={selectedReleaseIndex}
          initialPage={0}
          style={styles.pagerView}
        >
          {selectedRelease!.map((screenshot, index) => (
            <DropdownMenu.Root key={index}>
              <DropdownMenu.Trigger>
                <View style={styles.imageContainer}>
                  <View
                    style={[
                      styles.indexContainer,
                      {
                        right:
                          (width -
                            (screensSpaceImageHeight /
                              screenshot.thumbnail_dims[1]) *
                              screenshot.thumbnail_dims[0]) /
                            2 +
                          10,
                      },
                    ]}
                  >
                    <Text style={styles.indexText}>
                      {index + 1}/{selectedRelease!.length}
                    </Text>
                  </View>
                  <Image
                    style={[
                      styles.image,
                      {
                        width:
                          (screensSpaceImageHeight /
                            screenshot.thumbnail_dims[1]) *
                          screenshot.thumbnail_dims[0],
                      },
                    ]}
                    source={fullSize[index] ?? ""}
                    placeholder={
                      screenshot.sexual! >= 0.5
                        ? blurhash
                        : screenshot.thumbnail ?? blurhash
                    }
                    contentFit="contain"
                    placeholderContentFit="contain"
                    blurRadius={screenshot.sexual! >= 0.5 ? 100 : 0}
                    transition={300}
                  />
                </View>
              </DropdownMenu.Trigger>
              {/* @ts-expect-error TS2740 */}
              <DropdownMenu.Content>
                {keysArray.map((releaseName, index) => (
                  <DropdownMenu.Item
                    key={releaseName}
                    onSelect={() => {
                      selectRelease(index);
                    }}
                    disabled={index === selectedReleaseIndex}
                  >
                    {`${releaseName} (${
                      groupedScreenshots[releaseName]!.length
                    })`}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          ))}
        </PagerView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: "center",
  },
  indexContainer: {
    flex: 1,
    alignItems: "center",
    position: "absolute",
    top: 10,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  indexText: {
    color: "white",
    fontSize: 12,
  },
  image: {
    height: screensSpaceImageHeight,
    borderRadius: 20,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
  },
  subtitle: {
    fontSize: 13,
  },
  column: {
    flexDirection: "column",
  },
  box: {
    borderRadius: 15,
    padding: 10,
    width: 40,
    marginLeft: 7,
    height: 40,
    justifyContent: "center",
  },
  boxIcon: {
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  pt13: {
    paddingTop: 13,
  },
  pv13: {
    paddingVertical: 13,
  },
  pagerView: {
    flex: 1,
    height: screensSpaceImageHeight,
    width: "100%",
  },
  titleContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
  },

  titleBox: {
    paddingHorizontal: 13,
    paddingVertical: 10,
    backgroundColor: "#1A171C",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  moreText: {
    fontSize: 14,
  },

  ph13: {
    paddingHorizontal: 13,
  },
});
