import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { Text, View, getTheme } from "@/components/Themed";
import Animated, {
  useScrollViewOffset,
  useAnimatedStyle,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
  runOnJS,
  type AnimatedRef,
} from "react-native-reanimated";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

import type { VNDataType } from "@/Definitions/VNType";
import hexToRGBA from "@/Functions/HexToRGBA";
import { Link } from "expo-router";
import type { AnimatedScrollView } from "react-native-reanimated/lib/typescript/reanimated2/component/ScrollView";
import { easeGradient } from "react-native-easing-gradient";

const blurhash = "CEN]Rv-WPn^N}SQ[VFNF";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 320;

export default function HomeHeader({
  vnData,
  scrollRef,
}: {
  vnData: VNDataType[];
  scrollRef: AnimatedRef<AnimatedScrollView>;
}) {
  const [page, setPage] = useState(0);

  const [moving, setMoving] = useState(false);

  const scrollOffset = useScrollViewOffset(scrollRef);

  // Shared value for title opacity
  const titleOpacity = useSharedValue(1);

  // Scroll handler to update page and title opacity
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const newPage = Math.round(event.contentOffset.x / width);
      runOnJS(setPage)(newPage);

      const directlyOnPage = event.contentOffset.x / width;
      if (Number.isInteger(directlyOnPage)) {
        runOnJS(setMoving)(false);
      } else {
        runOnJS(setMoving)(true);
      }

      titleOpacity.value = interpolate(
        event.contentOffset.x % width,
        [0, width / 3, (2 * width) / 3, width],
        [1, 0, 0, 1]
      );
    },
  });

  useEffect(() => {
    if (page > vnData.length - 1 && !moving) {
      // Scroll to the first page without animation
      if (headerScrollRef.current) {
        headerScrollRef.current.scrollTo({ x: 0, animated: false });
      }
      // Reset page to 0
      runOnJS(setPage)(0);
    }
  }, [moving, vnData.length]);

  const scrollViewAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, 0]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const topContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      top: interpolate(
        scrollOffset.value,
        [-IMG_HEIGHT, 0, IMG_HEIGHT],
        [-IMG_HEIGHT + 90, 90, 0]
      ),
    };
  });

  const THEME = getTheme();
  const { colors, locations } = easeGradient({
    colorStops: {
      0: { color: "transparent" },
      1: { color: THEME.backgroundColor },
    },
  });

  const headerScrollRef = useAnimatedRef<Animated.ScrollView>();

  // Animated style for the title with changing opacity
  const animatedTitleStyle = useAnimatedStyle(() => {
    return {
      opacity: titleOpacity.value,
    };
  });

  return (
    <View>
      <Animated.ScrollView
        bounces={false}
        horizontal
        snapToInterval={width}
        decelerationRate={"fast"}
        snapToAlignment={"center"}
        showsHorizontalScrollIndicator={false}
        disableIntervalMomentum={true}
        style={scrollViewAnimatedStyle}
        ref={headerScrollRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {vnData.concat([vnData[0]!]).map((vnProps, index) => (
          <View style={{ width }} key={index}>
            <Link
              href={{
                pathname: "/home/VNView",
                params: { vnID: vnProps.id },
              }}
            >
              <Image
                style={styles.image}
                source={{ uri: vnProps.image?.url || "" }}
                placeholder={blurhash}
                contentFit="cover"
                placeholderContentFit="cover"
                blurRadius={vnProps.image?.sexual! >= 0.5 ? 60 : 0}
                transition={300}
              />
            </Link>
          </View>
        ))}
      </Animated.ScrollView>

      <LinearGradient
        pointerEvents="none"
        colors={colors}
        locations={locations}
        style={styles.gradient}
      />

      <Animated.View
        pointerEvents="none"
        style={[styles.top, topContainerAnimatedStyle]}
      >
        <View style={[styles.rowBetween, styles.slightShadow]}>
          <BlurView
            tint="dark"
            intensity={20}
            style={[
              {
                borderRadius: 10,
                overflow: "hidden",
              },
            ]}
          >
            <View
              style={[
                styles.pageBlur,
                {
                  backgroundColor:
                    Platform.OS == "ios"
                      ? hexToRGBA("#7A7373", 0.5)
                      : hexToRGBA("#121113", 0.9),
                },
              ]}
            >
              <Text style={styles.bold}>
                {page > vnData.length - 1 ? 1 : page + 1}/{vnData.length}
              </Text>
            </View>
          </BlurView>
          {/* Consider Adding Back Flag */}
        </View>
      </Animated.View>

      <View style={styles.bottom} pointerEvents="none">
        <Animated.Text
          adjustsFontSizeToFit={true}
          numberOfLines={2}
          style={[styles.title, styles.shadow, animatedTitleStyle]}
        >
          {vnData[page > vnData.length - 1 ? 0 : page]?.title}
        </Animated.Text>
        {/* <View style={[styles.row, styles.pt13]}>
          <Tag name={"Example"} />
          <Tag name={"Example"} />
          <Tag name={"Example"} />
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width,
    height: IMG_HEIGHT,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
  },
  top: {
    position: "absolute",
    paddingHorizontal: 13,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 13,
  },
  rowBetween: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageBlur: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 1,
    shadowOpacity: 0.5,
    shadowColor: "black",
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    shadowColor: "black",
  },
  slightShadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
    shadowOpacity: 0.5,
    shadowColor: "black",
  },
  bold: {
    fontWeight: "bold",
  },
  pt13: {
    paddingTop: 13,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  row: {
    flexDirection: "row",
    gap: 7,
    flexWrap: "wrap",
  },
});
