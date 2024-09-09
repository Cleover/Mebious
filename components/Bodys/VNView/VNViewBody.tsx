import React from "react";
import { View, Text } from "../../Themed";
import { Dimensions, StyleSheet } from "react-native";
import type { VNDataType } from "@/Definitions/VNType";
import CardCarousel from "@/components/Carousels/CardCarousel";
import TagsList from "@/components/Tags/TagsList";
import Card from "@/components/Cards/Card";
import ScreenshotCarousel from "@/components/Carousels/ScreenshotCarousel";
import groupScreenshotsByTitle from "@/Functions/GroupById";

export default function VNViewBody({ vnData }: { vnData: VNDataType }) {
  const { width } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <View style={styles.pt13}>
        <CardCarousel
          width={width - width * 0.1}
          cards={
            vnData.description && vnData.description.length > 0
              ? [
                  {
                    height: 200,
                    title: "Description",
                    bodyContent: (
                      <View>
                        <Text>{vnData.description}</Text>
                      </View>
                    ),
                    moreText: "Read More",
                    headerClickNavigation: "/home/sub_page/Description",
                    bodyContentClickNavigation: "/home/sub_page/Description",
                    moreTextClickNavigation: "/home/sub_page/Description",
                    linkParams: {
                      description: vnData.description ?? "",
                    },
                  },
                ]
              : []
          }
        />
      </View>
      {vnData.tags && vnData.tags.length > 0 && (
        <View style={styles.pt13}>
          <Card
            title={"Tags"}
            bodyContent={<TagsList tags={vnData.tags} />}
            moreTextTop={true}
            moreText={`View All (${vnData.tags.length}) ->`}
            headerClickNavigation={"/home/sub_page/Tags"}
            moreTextClickNavigation={"/home/sub_page/Tags"}
            linkParams={{ vnID: vnData.id }}
          />
        </View>
      )}
      <View style={styles.pt13}>
        <CardCarousel
          width={width - width * 0.1}
          cards={[
            {
              height: 200,
              title: "Releases",
              moreText: `View All ->`,
              headerClickNavigation: "/home/sub_page/Releases",
              moreTextClickNavigation: "/home/sub_page/Releases",
              linkParams: {
                vnID: vnData.id,
              },
            },
            {
              height: 200,
              title: "Covers",
              moreText: "View All ->",
              headerClickNavigation: "/home/sub_page/Covers",
              moreTextClickNavigation: "/home/sub_page/Covers",
              linkParams: {
                vnID: vnData.id,
              },
            },
            // {
            //   height: 200,
            //   title: "Characters",
            //   moreText: "View All ->",
            // },
            // {
            //   height: 200,
            //   title: "Reviews",
            //   moreText: "View All ->",
            // },
            // {
            //   height: 200,
            //   title: "Quotes",
            //   moreText: "View All ->",
            //   headerClickNavigation: "/home/sub_page/Quotes",
            //   moreTextClickNavigation: "/home/sub_page/Quotes",
            //   linkParams: {
            //     vnID: vnData.id,
            //   },
            // },
          ]}
        />
      </View>
      {vnData.screenshots && vnData.screenshots.length > 0 && (
        <View style={styles.pt13}>
          <ScreenshotCarousel
            groupedScreenshots={groupScreenshotsByTitle(vnData.screenshots)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingBottom: 30,
  },
  pt13: {
    paddingTop: 13,
  },
});
