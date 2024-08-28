import React, { type ReactElement } from "react";
import { StyleSheet, Pressable, Dimensions } from "react-native";
import { Text, View, getTheme } from "@/components/Themed";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import type { VNDataType } from "@/Definitions/VNType";

import hexToRGBA from "@/Functions/HexToRGBA";
import { easeGradient } from "react-native-easing-gradient";

const blurhash = "CEN]Rv-WPn^N}SQ[VFNF";

import { MasonryFlashList } from "@shopify/flash-list";
import { clamp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CoverMasonry({
  vnsData,
  setTopBarOpacity,

  columnCount = 2,

  header,
  footer,

  extraHeaderTopPadding = 0,
  extraFooterBottomPadding = 0,
}: {
  vnsData: VNDataType[];
  setTopBarOpacity?: (value: number) => void;

  columnCount?: number;

  header?: ReactElement;
  footer?: ReactElement;

  extraHeaderTopPadding?: number;
  extraFooterBottomPadding?: number;
}) {
  const { width } = Dimensions.get("window");

  const THEME = getTheme();

  const gap = columnCount > 1 ? 13 / (columnCount - 1) : 13;
  const masonryWidth = width - 2 * 13;
  const totalMasonrySpacing = gap * (columnCount - 1);
  const coverWidth = (masonryWidth - totalMasonrySpacing) / columnCount;
  const coverHeight = (coverWidth / 2) * 3;

  // I don't know why this puts a bit of padding on the right most side when columnCount > 2, this makes it mostly unnoticeable to the eye, but is painful to look at code wise.
  const compensate = columnCount > 1 ? gap / columnCount : 0;

  const { colors, locations } = easeGradient({
    colorStops: {
      0: {
        color: "transparent",
      },
      0.7: {
        color: hexToRGBA(THEME.backgroundColor, 0.7),
      },
      1: {
        color: hexToRGBA(THEME.backgroundColor, 0.9),
      },
    },
  });

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingHorizontal: 13,
        height: "100%",
        width: "100%",
      }}
    >
      <View
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <MasonryFlashList
          data={vnsData}
          numColumns={columnCount}
          onScroll={(event) => {
            if (setTopBarOpacity) {
              const currentOffset = event.nativeEvent.contentOffset.y;
              const opacity = clamp(((currentOffset - 100) / 100) * -1, 0, 1);
              setTopBarOpacity(opacity);
            }
          }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={header}
          ListHeaderComponentStyle={{
            paddingTop: insets.top + extraHeaderTopPadding,
          }}
          ListFooterComponent={footer}
          ListFooterComponentStyle={{
            paddingBottom: insets.bottom + extraFooterBottomPadding,
          }}
          renderItem={({ item, index }) => (
            <Link
              href={{
                pathname: "/home/VNView",
                params: { vnID: item.id },
              }}
              key={item.id}
              style={[
                styles.cover,
                (index + 1) % columnCount
                  ? ((index + 1) % columnCount) - 1
                    ? {
                        marginLeft: compensate - compensate / columnCount,
                      }
                    : {}
                  : {
                      marginLeft: compensate,
                      // borderColor: "blue",
                      // borderWidth: 1,
                    },
                { flex: 1 },
                {
                  width: coverWidth,
                  height: coverHeight,
                  marginBottom: gap,
                },
              ]}
              asChild
            >
              <Pressable>
                <Image
                  style={styles.image}
                  source={item.image?.url ?? ""}
                  placeholder={blurhash}
                  contentFit="cover"
                  placeholderContentFit="cover"
                  blurRadius={item.image?.sexual! >= 0.5 ? 100 : 0}
                  transition={300}
                />
                <LinearGradient
                  colors={colors}
                  locations={locations}
                  style={styles.gradient}
                />
                <Text
                  adjustsFontSizeToFit={true}
                  numberOfLines={2}
                  style={styles.text}
                >
                  {item.title}
                </Text>
              </Pressable>
            </Link>
          )}
          estimatedItemSize={coverHeight}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cover: {
    position: "relative",
  },
  image: {
    flex: 1,
    borderRadius: 7,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    borderRadius: 7,
  },
  text: {
    position: "absolute",
    bottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  pb13: {
    paddingBottom: 13,
  },
  header: {
    paddingTop: 100 + 13,
  },
  outline: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  grow: {
    flexGrow: 1,
  },
  box: {
    borderRadius: 15,
    padding: 5,
    width: 45,
    height: 45,
    justifyContent: "center",
  },
  boxIcon: {
    textAlign: "center",
  },
});
