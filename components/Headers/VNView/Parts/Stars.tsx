import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Stars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating / 20);
  const halfStar = Math.floor((rating % 20) / 10);

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
        color={"white"}
      />
    ));
  };

  return (
    <View style={styles.container}>
      {renderStars()}
      <Text style={styles.text}>({(rating / 10).toFixed(2)})</Text>
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
    color: "white",
  },
});
