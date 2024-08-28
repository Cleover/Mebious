import React, { type ReactElement } from "react";
import { View } from "@/components/Themed";

import type { ReleaseDataType } from "@/Definitions/ReleaseType";

import { FlashList } from "@shopify/flash-list";
import { clamp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ReleaseCell from "../Cells/ReleaseCell";

export default function ReleaseList({
  releasesData,
  setTopBarOpacity,

  header,
  footer,

  extraHeaderTopPadding = 0,
  extraFooterBottomPadding = 0,
}: {
  releasesData: ReleaseDataType[];
  setTopBarOpacity?: (value: number) => void;

  header?: ReactElement;
  footer?: ReactElement;

  extraHeaderTopPadding?: number;
  extraFooterBottomPadding?: number;
}) {
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
        <FlashList
          data={releasesData}
          disableIntervalMomentum={true}
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
            <ReleaseCell key={index} releaseData={item} />
          )}
          estimatedItemSize={65}
        />
      </View>
    </View>
  );
}
