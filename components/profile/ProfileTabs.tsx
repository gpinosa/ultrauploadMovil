import { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const tabs = [
  { id: "general", label: "Descripción General" },
  { id: "files", label: "Archivos" },
  { id: "posts", label: "Publicaciones" },
  { id: "comments", label: "Comentarios" },
];

export function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {tabs.map((tab) => (
          <Pressable
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            style={styles.tabWrapper}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
            {activeTab === tab.id && <View style={styles.activeIndicator} />}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#2f3336",
    marginTop: 16,
  },
  tabsContainer: {
    paddingHorizontal: 16,
  },
  tabWrapper: {
    position: "relative",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tabText: {
    color: "#71767b",
    fontSize: 15,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#ffffff",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    left: 16,
    right: 16,
    height: 4,
    backgroundColor: "#1d9bf0",
    borderRadius: 2,
  },
});
