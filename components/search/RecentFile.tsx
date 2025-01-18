import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type RecentFileProps = {
  name: string;
  type: string;
  size: string;
  date: string;
};

export const RecentFile: React.FC<RecentFileProps> = ({
  name,
  type,
  size,
  date,
}) => (
  <TouchableOpacity style={styles.fileItem}>
    {type === "pdf" ? (
      <MaterialCommunityIcons name="file-pdf-box" size={40} color="#FF5733" />
    ) : (
      <View style={styles.imageFileContainer}>
        <MaterialCommunityIcons
          name="file-image"
          size={40}
          color="#4CAF50"
          style={styles.imageIcon}
        />
      </View>
    )}
    <View style={styles.fileInfo}>
      <Text style={styles.fileName}>{name}</Text>
      <Text style={styles.fileDetails}>{`${size} • ${date}`}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  fileInfo: {
    marginLeft: 12,
    flex: 1,
  },
  fileName: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
  fileDetails: {
    color: Colors.grey,
    fontSize: 14,
  },
  imageFileContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  imageIcon: {
    opacity: 0.9,
  },
});
