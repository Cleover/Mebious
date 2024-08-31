import React from "react";

import { Text, View } from "@/components/Themed";

export default function SubViewHeader({
  title,
  rightSideContent,
}: {
  title: string;
  rightSideContent?: any;
}) {
  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-4xl font-bold">{title}</Text>

      <View className="flex-row items-center gap-2">
        {rightSideContent}
      </View>
    </View>
  );
}
