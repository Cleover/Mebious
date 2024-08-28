import React, { type ReactElement } from "react";
import { ScrollView } from "react-native";
import Card from "../Cards/Card";
import type { Href, RouteParamInput } from "expo-router";

export default function CardCarousel({
  width,
  cards,
}: {
  width: number;
  cards: {
    index?: number;
    length?: number;
    width?: number;
    height?: number;
    moreTextTop?: boolean;
    title: string;
    bodyContent?: ReactElement;
    moreText: string;

    headerClickNavigation?: Href<string | object>;
    moreTextClickNavigation?: Href<string | object>;
    bodyContentClickNavigation?: Href<string | object>;

    linkParams?: RouteParamInput<any>;
  }[];
}) {
  return (
    <>
      {cards.length != 1 ? (
        <ScrollView
          horizontal={true}
          snapToInterval={width}
          decelerationRate={0}
          snapToAlignment={"center"}
          showsHorizontalScrollIndicator={false}
        >
          {cards.map((cardProps, index) => (
            <Card
              key={index}
              index={index}
              length={cards.length}
              width={width}
              {...cardProps}
            />
          ))}
        </ScrollView>
      ) : (
        <Card {...cards[0]!} />
      )}
    </>
  );
}
