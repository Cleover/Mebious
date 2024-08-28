import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View, getTheme } from "@/components/Themed";
import Animated, {
  useScrollViewOffset,
  useAnimatedStyle,
  interpolate,
  type AnimatedRef,
} from "react-native-reanimated";
import { Dimensions, StyleSheet, Pressable } from "react-native";

import Stars from "./Parts/Stars";
import Title from "./Parts/Title";
import ButtonsRow from "./Parts/ButtonsRow";

import type { VNDataType } from "@/Definitions/VNType";

import hexToRGBA from "@/Functions/HexToRGBA";
import type { AnimatedScrollView } from "react-native-reanimated/lib/typescript/reanimated2/component/ScrollView";
import { easeGradient } from "react-native-easing-gradient";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 475;

export default function VNViewHeader({
  vnData,
  scrollRef,
}: {
  vnData: VNDataType;
  scrollRef: AnimatedRef<AnimatedScrollView>;
}) {
  // @ts-ignore - Its a different type, but works the same
  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
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

  const THEME = getTheme();

  const { colors, locations } = easeGradient({
    colorStops: {
      0: {
        color: "transparent",
      },
      0.75: {
        color: hexToRGBA(THEME.backgroundColor, 0.9),
      },
      0.97: {
        color: THEME.backgroundColor,
      },
      1: {
        color: THEME.backgroundColor,
      },
    },
  });

  return (
    <View>
      <Animated.Image
        style={[styles.image, imageAnimatedStyle]}
        source={{ uri: vnData.image?.url }}
        blurRadius={vnData.image?.sexual! >= 0.5 ? 30 : 0}
      />
      <LinearGradient
        colors={colors}
        locations={locations}
        style={styles.gradient}
      />
      <View
        style={styles.bottomContainer}
      >
        <Stars
          rating={vnData?.rating ?? 0}
          votecount={vnData?.votecount ?? 0}
        />
        <View
          style={styles.verticalPadding5}
        >
          <Title title={vnData.title ?? ""} aliases={vnData.aliases ?? []} />
        </View>

        <View style={styles.row}>
          {vnData.developers?.map((developer, index) => (
            <React.Fragment key={index}>
              {index !== 0 && (
                <Text
                  style={[styles.developers, styles.unimportant, styles.ph3]}
                >
                  &
                </Text>
              )}
              <Pressable
                onPress={() => {
                  console.log(developer.name ?? "null");
                }}
              >
                <Text style={styles.developers}>
                  {developer.name ?? "null"}
                </Text>
              </Pressable>
            </React.Fragment>
          ))}
        </View>

        <ButtonsRow vnID={vnData.id} />
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
  topContainer: {
    width: "100%",
    position: "absolute",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 10,
    paddingHorizontal: 13,
    width: "100%",
    marginBottom: -20,
  },
  developers: {
    fontSize: 14,
    fontWeight: "300",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  verticalPadding5: {
    paddingVertical: 5,
  },
  unimportant: {
    opacity: 0.7,
  },
  ph3: {
    paddingHorizontal: 3,
  },
});
