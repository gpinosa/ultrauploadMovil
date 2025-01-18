import React from "react";
import { View, StyleSheet } from "react-native";
import { HomeScreen } from "@/components/home/HomeScreen";

export default function Home() {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
