import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface ActivityItemProps {
  fileName: string;
  date: string;
}

const getFileIcon = (
  fileName: string
): keyof typeof MaterialCommunityIcons.glyphMap => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "pdf":
      return "file-pdf-box";
    case "doc":
    case "docx":
      return "file-word-box";
    case "xls":
    case "xlsx":
      return "file-excel-box";
    case "ppt":
    case "pptx":
      return "file-powerpoint-box";
    case "zip":
    case "rar":
      return "folder-zip";
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return "file-image";
    case "mp4":
    case "mov":
    case "avi":
      return "file-video";
    default:
      return "file-document";
  }
};

export const ActivityItem: React.FC<ActivityItemProps> = ({
  fileName,
  date,
}) => {
  const fileIcon = getFileIcon(fileName);

  return (
    <TouchableOpacity style={styles.activityItem} activeOpacity={0.7}>
      <View style={styles.activityIconContainer}>
        <MaterialCommunityIcons name={fileIcon} size={24} color="#60A5FA" />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityFileName}>{fileName}</Text>
        <Text style={styles.activityDate}>{date}</Text>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={20}
        color={Colors.grey}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityFileName: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  activityDate: {
    color: Colors.grey,
    fontSize: 14,
    marginTop: 4,
  },
});
