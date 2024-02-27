import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";

import * as DropdownMenu from "zeego/dropdown-menu";

export default function Title({
  title,
  aliases,
}: {
  title: string;
  aliases: string[];
}) {
  return (
    <View style={[styles.row, { backgroundColor: "transparent" }]}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <View style={[styles.container, { backgroundColor: "transparent" }]}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={2}
              style={[styles.title, styles.bold]}
            >
              {title}
            </Text>
          </View>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {aliases.map((alias) => (
            <DropdownMenu.Item key={alias} disabled={true}>
              {alias}
            </DropdownMenu.Item>
          ))}
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
  title: {
    fontSize: 30,
  },
  bold: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
