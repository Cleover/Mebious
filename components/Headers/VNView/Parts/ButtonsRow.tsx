import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text, View, getTheme } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";

import * as DropdownMenu from "zeego/dropdown-menu";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import * as Sharing from "expo-sharing";
import { notifyNotImplemented } from "@/Functions/NotifyPopup";

export default function ButtonsRow({ vnID }: { vnID: string }) {
  const THEME = getTheme();

  const vnURL = `https://vndb.org/${vnID}`;

  const copyURL = async () => {
    await Clipboard.setStringAsync(vnURL);
  };

  const shareURL = async () => {
    await Sharing.shareAsync(vnURL);
  };

  const openURL = () => {
    Linking.openURL(vnURL);
  };

  return (
    <View style={[styles.row, styles.pv13, { gap: 7 }]}>
      <Pressable style={{ opacity: 0.5 }} onPress={notifyNotImplemented}>
        <View style={[styles.box, THEME.option.secondary]}>
          <Ionicons
            size={28}
            name="chatbubble-ellipses-outline"
            color={THEME.option.secondary.color}
            style={styles.boxIcon}
          />
        </View>
      </Pressable>
      <Pressable style={{ opacity: 0.5 }} onPress={notifyNotImplemented}>
        <View style={[styles.box, THEME.option.secondary]}>
          <Ionicons
            size={28}
            name="star-outline"
            color={THEME.option.secondary.color}
            style={styles.boxIcon}
          />
        </View>
      </Pressable>
      <Pressable style={{ opacity: 0.5 }} onPress={notifyNotImplemented}>
        <View style={[styles.box, THEME.option.secondary]}>
          <Ionicons
            size={28}
            name="ellipsis-horizontal"
            color={THEME.option.secondary.color}
            style={styles.boxIcon}
          />
        </View>
      </Pressable>
      <Pressable
        style={[styles.longBox, THEME.option.primary, { opacity: 0.5 }]}
        onPress={notifyNotImplemented}
      >
        <View>
          <View style={styles.longBoxRow}>
            <Ionicons
              size={18}
              name="pencil"
              color={THEME.option.primary.color}
              style={{ marginLeft: -10 }}
            />
            <Text
              style={[
                styles.longBoxText,
                { color: THEME.option.primary.color },
              ]}
            >
              Label
            </Text>
          </View>
        </View>
      </Pressable>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <View style={[styles.box, THEME.option.secondary]}>
            <Ionicons
              size={28}
              name="share-outline"
              color={THEME.option.secondary.color}
              style={styles.boxIcon}
            />
          </View>
        </DropdownMenu.Trigger>
        {/* @ts-expect-error TS2740 */}
        <DropdownMenu.Content>
          <DropdownMenu.Item key={"copy"} onSelect={copyURL}>
            Copy URL
          </DropdownMenu.Item>
          <DropdownMenu.Item key={"share"} onSelect={shareURL}>
            Share URL
          </DropdownMenu.Item>
          <DropdownMenu.Item key={"open"} onSelect={openURL}>
            Open in VNDB
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </View>
  );
}

const styles = StyleSheet.create({
  pv13: {
    paddingVertical: 13,
  },
  box: {
    borderRadius: 15,
    padding: 5,
    width: 45,
    height: 45,
    justifyContent: "center",
  },
  longBox: {
    borderRadius: 15,
    padding: 10,
    height: 45,
    flexGrow: 1,
    justifyContent: "center",
  },
  longBoxText: {
    paddingLeft: 8,
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
  },
  longBoxRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  boxIcon: {
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 6.5,
  },
});
