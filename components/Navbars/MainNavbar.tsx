import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, getTheme } from "@/components/Themed";
import hexToRGBA from "@/Functions/HexToRGBA";
import { BlurView } from "expo-blur";

export default function MainNavbar({ title }: { title: string }) {
  const insets = useSafeAreaInsets();

  const NOTIFICATION_COUNT = 100

  const THEME = getTheme();

  return (
    <View style={[styles.container, styles.shadow, { paddingTop: insets.top }]}>
      <Text style={[styles.title]}>{title}</Text>
      {/* <View style={styles.iconsContainer}>
        <Pressable onPress={() => {}}>
          <BlurView
            tint="dark"
            intensity={10}
            style={[
              {
                backgroundColor: hexToRGBA(THEME.backgroundColor, 0.8),
                borderColor: hexToRGBA(THEME.color, 0.8),
                shadowColor: hexToRGBA(THEME.color, 0.8),
                overflow: "hidden",
              },
              styles.notifications,
            ]}
          >
            <Ionicons name="file-tray-outline" size={30} color={THEME.color} />
          </BlurView>
          <View style={[styles.notificationCircle, styles.hide]}>
            <Text style={styles.notificationCount}>{NOTIFICATION_COUNT > 99 ? "99+" : NOTIFICATION_COUNT}</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => {}}>
          <Ionicons name="menu-outline" size={30} color={THEME.color} />
        </Pressable>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    paddingLeft: 13,
    paddingRight: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  notifications: {
    borderWidth: 0.8,
    borderRadius: 7,
    padding: 3,

    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 0,
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
    shadowOpacity: 0.5,
    shadowColor: "black",
  },
  notificationCircle: {
    backgroundColor: "#D53636",
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 9,
    position: "absolute",
    bottom: -5,
    right: -5,
  },
  notificationCount: {
    textAlign: "center",
    lineHeight: 17,
    fontSize: 12,
    fontWeight: "bold",
  },
  hide: {
    display: "none",
  },
});
