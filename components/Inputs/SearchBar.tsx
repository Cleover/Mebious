import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";

export default function SearchBar({
  submitted,
}: {
  submitted: (text: string) => void;
}) {
  const [query, setQuery] = useState("");

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchIcon}>
        <Ionicons name="search" size={20} color={"white"} />
      </View>

      <TextInput
        placeholder="Search"
        placeholderTextColor={"#D1CFCF"}
        style={styles.textInput}
        clearButtonMode="while-editing"
        onSubmitEditing={() => {
          submitted(query);
        }}
        onChangeText={(text) => {
          setQuery(text);
          if(text == "") {
            submitted("")
          }
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    color: "white",
    fontSize: 16,
    marginRight: 13,
  },
  searchIcon: {
    marginHorizontal: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    height: 35,
  },
});
