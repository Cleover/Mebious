import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import { Background, Text, View } from "@/components/Themed";
import SubViewHeader from "@/components/Headers/SubViewHeader";
import BackNavbar from "@/components/Navbars/BackNavbar";

import { handleScrollOpacity } from "@/Functions/NavbarUtils";

export default function Description() {
  const { description } = useLocalSearchParams();

  const insets = useSafeAreaInsets();

  const [opacity, setOpacity] = useState<number>(1);

  return (
    <Background>
      <ScrollView
        onScroll={(event) => handleScrollOpacity(event, setOpacity, 50)}
        contentContainerStyle={{ paddingTop: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4 gap-3" style={{ paddingBottom: insets.bottom }}>
          <SubViewHeader title="Description" />
          <Text>{description}</Text>
        </View>
      </ScrollView>
      <BackNavbar opacity={opacity} />
    </Background>
  );
}
