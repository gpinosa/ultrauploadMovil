import React from "react";
import { View, StyleSheet } from "react-native";
import { SearchScreen } from "@/components/search/SearchScreen";

export default function Search() {
  return (
    <View style={styles.container}>
      <SearchScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
