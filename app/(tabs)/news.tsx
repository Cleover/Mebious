import React from "react";
import { StyleSheet } from "react-native";
import { Text, View, Background } from "@/components/Themed";

export default function NewsScreen() {
  return (
    <Background style={styles.container}>
      <Text style={styles.title}>Not yet implemented</Text>
      <Text style={styles.subtext}>Please check back later</Text>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtext: {
    paddingTop: 13,
    fontSize: 14,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
