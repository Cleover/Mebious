import React from "react";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

const blurhash = "L9D]L^0MIT?Y}3J:?as7~Uo|W,s+";

export default function VNCoverCarousel({
  vnsData,
  height,
}: {
  vnsData: any[];
  height: number;
}) {
  const coverWidth = (2 / 3) * height;
  return (
    <View style={[styles.body, { height }]}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          paddingLeft: 20,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {vnsData.map((vnData, index) => (
          <Link
            href={{
              pathname: "/home/VNView",
              params: { vnID: vnData.id },
            }}
            key={index}
            style={[styles.cover, { width: coverWidth }]}
            asChild
          >
            <Pressable>
              <Image
                style={styles.image}
                source={vnData.image?.url}
                placeholder={blurhash}
                contentFit="cover"
                transition={1000}
              />
              <LinearGradient
                colors={[
                  "rgba(9, 20, 34, 0)",
                  "rgba(9, 20, 34, 0.8)",
                  "rgba(9, 20, 34, 1)",
                ]}
                style={styles.gradient}
              />
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={2}
                style={styles.text}
              >
                {vnData.title}
              </Text>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "transparent",
  },
  cover: {
    position: "relative",
    marginBottom: 20,
    marginRight: 10,
  },
  image: {
    flex: 1,
    borderRadius: 15,
    width: "100%",
    backgroundColor: "transparent",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    borderRadius: 15,
  },
  text: {
    position: "absolute",
    bottom: 10,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
});
