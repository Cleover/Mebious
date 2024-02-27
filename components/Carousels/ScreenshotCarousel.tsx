import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";

import { View, Text, getTheme } from "@/components/Themed";
import type { VNScreenshotType } from "@/Definitions/VNType";
import PagerView from "react-native-pager-view";
import { Ionicons } from "@expo/vector-icons";

import * as DropdownMenu from "zeego/dropdown-menu";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const screensSpaceImageHeight = (width - 40) * (9 / 16);

export default function ScreenshotCarousel({
  groupedScreenshots,
}: {
  groupedScreenshots: { [name: string]: VNScreenshotType[] };
}) {
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [imageDimensions, setImageDimensions] = useState<{
    [nameAndIndex: string]: { width: number; height: number };
  }>({});
  const [selectedReleaseIndex, setSelectedReleaseIndex] = useState(0);
  const fadeAnim = useSharedValue(1);

  let keysArray = Object.keys(groupedScreenshots);
  let selectedRelease = groupedScreenshots[keysArray[selectedReleaseIndex]!];

  const fullSize = selectedRelease!.map((screenshot) =>
    screenshot.thumbnail?.replace("/st/", "/sf/")
  );

  const THEME = getTheme();

  const handleImageLoad = (index: number) => {
    if (!loadedImages.includes(`${selectedReleaseIndex}-${index}`)) {
      Image.prefetch(fullSize[index] ?? "").then(() => {
        setLoadedImages((prevState) => [
          ...prevState,
          `${selectedReleaseIndex}-${index}`,
        ]);
      });
    }
  };

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
    <View style={styles.pv20}>
      <View style={styles.row}>
        <View style={[styles.column, styles.titleContainer]}>
          <Text style={[styles.title, styles.bold]}>Screenshots</Text>
          <Animated.View style={animatedStyle}>
            <Text style={[styles.subtitle, styles.bold]}>
              {keysArray[selectedReleaseIndex]!}
            </Text>
          </Animated.View>
        </View>

        <View style={styles.buttonsContainer}>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <View style={[styles.box, THEME.option.primary]}>
                <Ionicons
                  size={20}
                  name="game-controller"
                  color={THEME.option.primary.color}
                  style={styles.boxIcon}
                />
              </View>
            </DropdownMenu.Trigger>
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
        </View>
      </View>
      <Animated.View style={[styles.pt20, animatedStyle]}>
        <PagerView
          key={selectedReleaseIndex}
          initialPage={0}
          style={styles.pagerView}
        >
          {selectedRelease!.map((screenshot, index) => (
            <View key={index} style={styles.imageContainer}>
              <View
                style={[
                  styles.indexContainer,
                  {
                    right: imageDimensions[
                      `${keysArray[selectedReleaseIndex]}-${index}`
                    ]
                      ? (width -
                          (screensSpaceImageHeight /
                            imageDimensions[
                              `${keysArray[selectedReleaseIndex]}-${index}`
                            ]!.height) *
                            imageDimensions[
                              `${keysArray[selectedReleaseIndex]}-${index}`
                            ]!.width) /
                          2 +
                        10
                      : 0,
                    opacity: loadedImages.includes(
                      `${selectedReleaseIndex}-${index}`
                    )
                      ? 1
                      : 0,
                  },
                ]}
              >
                <Text style={styles.indexText}>
                  {index + 1}/{selectedRelease!.length}
                </Text>
              </View>
              {!loadedImages.includes(`${selectedReleaseIndex}-${index}`) ? (
                <Image
                  source={screenshot.thumbnail ?? ""}
                  style={styles.image}
                  onLoad={(imageData) => {
                    setImageDimensions((prevState) => ({
                      ...prevState,
                      [`${keysArray[selectedReleaseIndex]}-${index}`]: {
                        width: imageData.source.width,
                        height: imageData.source.height,
                      },
                    }));
                    handleImageLoad(index);
                  }}
                  contentFit="contain"
                />
              ) : (
                <>
                  {imageDimensions[
                    `${keysArray[selectedReleaseIndex]}-${index}`
                  ] && (
                    <Image
                      source={fullSize[index] ?? ""}
                      style={[
                        styles.image,
                        {
                          aspectRatio:
                            imageDimensions[
                              `${keysArray[selectedReleaseIndex]}-${index}`
                            ]!.width /
                            imageDimensions[
                              `${keysArray[selectedReleaseIndex]}-${index}`
                            ]!.height,
                        },
                      ]}
                      contentFit="contain"
                    />
                  )}
                </>
              )}
            </View>
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
    width: width - 40,
    borderRadius: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
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
  title: {
    fontSize: 30,
  },
  bold: {
    fontWeight: "bold",
  },
  pt20: {
    paddingTop: 20,
  },
  pv20: {
    paddingVertical: 20,
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
});
