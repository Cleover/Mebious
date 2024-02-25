import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Stars from "@/components/Headers/VNView/Parts/Stars";
import { Text, View } from "../../Themed";
import Animated, {
  useScrollViewOffset,
  useAnimatedStyle,
  interpolate,
  AnimatedRef,
} from "react-native-reanimated";
import { Dimensions, StyleSheet, Pressable } from "react-native";
import ButtonsRow from "./Parts/ButtonsRow";

import { VNDataType } from "@/Definitions/VNType";
import HeaderButtons from "./Parts/HeaderButtons";
import { AnimatedScrollView } from "react-native-reanimated/lib/typescript/reanimated2/component/ScrollView";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 475;

export default function VNViewHeader({
  vnData,
  scrollRef,
}: {
  vnData: VNDataType;
  scrollRef: AnimatedRef<AnimatedScrollView>;
}) {
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

  const topContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      top: interpolate(
        scrollOffset.value,
        [-IMG_HEIGHT, 0, IMG_HEIGHT],
        [-IMG_HEIGHT + 50, 50, 1]
      ),
    };
  });

  return (
    <View>
      <Animated.Image
        style={[styles.image, imageAnimatedStyle]}
        source={{ uri: vnData.image?.url }}
      />
      <LinearGradient
        colors={[
          "rgba(6, 16, 28, 0)",
          "rgba(6, 16, 28, 0.7)",
          "rgba(6, 16, 28, 1)",
        ]}
        style={styles.gradient}
      />
      <Animated.View style={[styles.topContainer, topContainerAnimatedStyle]}>
        <HeaderButtons length_minutes={vnData.length_minutes ?? 0} />
      </Animated.View>
      <View style={styles.bottomContainer}>
        <Stars rating={vnData?.rating ?? 0} />
        <View style={[styles.row, styles.verticalPadding5]}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={2}
            style={[styles.title, styles.bold]}
          >
            {vnData.title}
          </Text>
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

        <ButtonsRow />
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
    position: "absolute",
    backgroundColor: "transparent",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 10,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    width: "100%",
    marginBottom: -20,
  },
  title: {
    fontSize: 30,
  },
  developers: {
    fontSize: 13,
    fontWeight: "300",
  },
  bold: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "transparent",
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
