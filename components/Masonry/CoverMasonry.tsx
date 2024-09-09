import React, { type ReactElement } from "react";
import { StyleSheet, Pressable, Dimensions } from "react-native";

import * as DropdownMenu from "zeego/dropdown-menu";

import { Text, View, getTheme } from "@/components/Themed";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";

import type { CoverInfo, CoverType } from "@/Definitions/CoverType";

import hexToRGBA from "@/Functions/HexToRGBA";
import { easeGradient } from "react-native-easing-gradient";

const blurhash = "CEN]Rv-WPn^N}SQ[VFNF";

import { MasonryFlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { handleScrollOpacity } from "@/Functions/NavbarUtils";

export default function CoverMasonry({
  vnsData,
  topBarOverwrite,

  columnCount = 2,

  header,
  footer,

  extraHeaderTopPadding = 0,
  extraFooterBottomPadding = 0,

  renderTitles = true,

  idType = "vn",
}: {
  vnsData: CoverType[];
  topBarOverwrite?: (value: number) => void;

  columnCount?: number;

  header?: ReactElement;
  footer?: ReactElement;

  extraHeaderTopPadding?: number;
  extraFooterBottomPadding?: number;

  renderTitles?: boolean;

  idType?: "vn" | "release";
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

  const handleNavigation = (info: CoverInfo) => {
    router.push({
      pathname: idType == "release" ? "/home/sub_page/Release" : "/home/VNView",
      params: idType == "release" ? { rID: info?.id } : { vnID: info?.id },
    });
  };

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
          onScroll={(event) => handleScrollOpacity(event, topBarOverwrite)}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={header}
          ListHeaderComponentStyle={{
            paddingTop: insets.top + extraHeaderTopPadding,
            paddingBottom: 13,
          }}
          ListFooterComponent={footer}
          ListFooterComponentStyle={{
            paddingTop: 13,
            paddingBottom: insets.bottom + extraFooterBottomPadding,
          }}
          renderItem={({ item, index }) => (
            <View key={idType == "release" ? item.id : item.info[0]?.id}>
              {item.info.length == 1 ? (
                <Link
                  href={{
                    pathname:
                      idType == "release"
                        ? "/home/sub_page/Release"
                        : "/home/VNView",
                    params:
                      idType == "release"
                        ? { rID: item.info[0]?.id }
                        : { vnID: item.info[0]?.id },
                  }}
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
                        },
                    { flex: 1 },
                    {
                      width: coverWidth,
                      // Make this editable with settings in the future
                      height: item.thumbnail_dims
                        ? (coverWidth * item.thumbnail_dims[1]) /
                          item.thumbnail_dims[0]
                        : coverHeight,
                      marginBottom: gap,
                    },
                  ]}
                  asChild
                >
                  <Pressable>
                    <Image
                      style={styles.image}
                      source={item.url ?? ""}
                      placeholder={
                        item.sexual! >= 0.5
                          ? blurhash
                          : item.thumbnail ?? blurhash
                      }
                      contentFit="cover"
                      placeholderContentFit="cover"
                      blurRadius={item.sexual! >= 0.5 ? 100 : 0}
                      transition={300}
                    />

                    {renderTitles && (
                      <LinearGradient
                        colors={colors}
                        locations={locations}
                        style={styles.gradient}
                      />
                    )}

                    {renderTitles && (
                      <Text
                        adjustsFontSizeToFit={true}
                        numberOfLines={2}
                        style={styles.text}
                      >
                        {item.info[0]?.title}
                      </Text>
                    )}
                  </Pressable>
                </Link>
              ) : (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <View
                      style={[
                        styles.cover,
                        (index + 1) % columnCount
                          ? ((index + 1) % columnCount) - 1
                            ? {
                                marginLeft:
                                  compensate - compensate / columnCount,
                              }
                            : {}
                          : {
                              marginLeft: compensate,
                            },
                        { flex: 1 },
                        {
                          width: coverWidth,
                          // Make this editable with settings in the future
                          height: item.thumbnail_dims
                            ? (coverWidth * item.thumbnail_dims[1]) /
                              item.thumbnail_dims[0]
                            : coverHeight,
                          marginBottom: gap,
                        },
                      ]}
                    >
                      <Image
                        style={styles.image}
                        source={item.url ?? ""}
                        placeholder={
                          item.sexual! >= 0.5
                            ? blurhash
                            : item.thumbnail ?? blurhash
                        }
                        contentFit="cover"
                        placeholderContentFit="cover"
                        blurRadius={item.sexual! >= 0.5 ? 100 : 0}
                        transition={300}
                      />
                    </View>
                  </DropdownMenu.Trigger>
                  {/* @ts-expect-error TS2740 */}
                  <DropdownMenu.Content>
                    <DropdownMenu.Group>
                      {item.info.map((info, index) => (
                        <DropdownMenu.Item
                          key={index.toString()}
                          onSelect={() => {
                            handleNavigation(info);
                          }}
                        >
                          {info.title}
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.Group>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              )}
            </View>
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
});
