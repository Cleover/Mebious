import React, { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";

import "react-native-reanimated";

import MainNavbar from "@/components/Navbars/MainNavbar";
import { View } from "@/components/Themed";

import { getSchemaData } from "@/API/Schema";

import type { SchemaType } from "@/Definitions/SchemaType";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  focused: boolean;
  focusedIcon?: React.ComponentProps<typeof Ionicons>["name"];
}) {
  const { color, focused, ...rest } = props;
  if (focused) {
    rest.name = props.focusedIcon || props.name;
  }
  return <Ionicons size={28} color={color} {...rest} />;
}

export default function TabLayout() {
  const [selectedTab, setSelectedTab] = useState<string>("Home");
  const [opacity, setOpacity] = useState<{ [key: string]: number }>({});
  const [lastOpacity, setLastOpacity] = useState(0);

  useEffect(() => {
    getSchemaData()
      .then((data: SchemaType) => {
        (window as any).schema = data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const updateOpacity = (value: number) => {
    if (value != lastOpacity) {
      setLastOpacity(value);
      setOpacity((prevState) => ({
        ...prevState,
        [selectedTab]: value,
      }));
    }
  };

  (window as any).setTopBarOpacity = updateOpacity;

  return (
    <Tabs
      screenListeners={{
        tabPress: (e) => {
          const parts = e.target?.split("-");
          if (!parts || parts.length < 1) return;
          let result = parts[0];
          if (!result || result === "index") result = "home";
          setSelectedTab(result.charAt(0).toUpperCase() + result.slice(1));
        },
      }}
      screenOptions={{
        headerShown: true,
        header: () => (
          <View
            style={{
              opacity: opacity[selectedTab],
              pointerEvents: opacity[selectedTab] == 0 ? "none" : "auto",
            }}
          >
            <MainNavbar title={selectedTab} />
          </View>
        ),
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          position: "absolute",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0,
          height: 85,
          paddingTop: 5,
          paddingHorizontal: 20,
        },
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={100}
            className="rounded-t-3xl overflow-hidden"
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: `rgba(18, 17, 19, ${
                  Platform.OS == "ios" ? "0.5" : "1"
                } )`,
              },
            ]}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="home-outline"
              color={color}
              focused={focused}
              focusedIcon="home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: "News",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="newspaper-outline"
              color={color}
              focused={focused}
              focusedIcon="newspaper"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="search-outline"
              color={color}
              focused={focused}
              focusedIcon="search"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="lists"
        options={{
          title: "Lists",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="list-outline"
              color={color}
              focused={focused}
              focusedIcon="list"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="person-circle-outline"
              color={color}
              focused={focused}
              focusedIcon="person-circle"
            />
          ),
        }}
      />
    </Tabs>
  );
}
