import React from "react";
import { StyleSheet } from "react-native";
import { Text, View, getTheme } from "@/components/Themed";

import { Ionicons } from "@expo/vector-icons";

import * as DropdownMenu from "zeego/dropdown-menu";

export default function Stars({
  rating,
  votecount,
}: {
  rating: number;
  votecount: number;
}) {
  const fullStars = Math.floor(rating / 20);
  const halfStar = Math.floor((rating % 20) / 10);

  const THEME = getTheme();

  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Ionicons
        size={22}
        name={
          index < fullStars
            ? "star"
            : index === fullStars && halfStar === 1
            ? "star-half"
            : "star-outline"
        }
        key={index}
        color={THEME.color}
      />
    ));
  };

  return (
    <View style={styles.row}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <View style={styles.container}>
            {renderStars()}
            <Text style={styles.text}>({(rating / 10).toFixed(2)})</Text>
          </View>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item key="content" disabled={true}>
            {`From ${votecount.toLocaleString()} votes`}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginTop: 2,
    paddingLeft: 5,
    fontWeight: "bold",
    fontSize: 17,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
