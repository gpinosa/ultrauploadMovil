import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface FeaturedFileProps {
  item: {
    name: string;
    size: string;
    thumbnail: string;
  };
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

export const FeaturedFile: React.FC<FeaturedFileProps> = ({ item }) => (
  <TouchableOpacity style={styles.featuredFile} activeOpacity={0.7}>
    <Image source={{ uri: item.thumbnail }} style={styles.fileThumbnail} />
    <BlurView intensity={80} tint="dark" style={styles.fileInfo}>
      <MaterialCommunityIcons
        name={getFileIcon(item.name)}
        size={20}
        color={Colors.primary}
        style={styles.fileTypeIcon}
      />
      <Text style={styles.fileName}>{item.name}</Text>
      <Text style={styles.fileSize}>{item.size}</Text>
    </BlurView>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  featuredFile: {
    width: 280,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
  },
  fileThumbnail: {
    width: "100%",
    height: "100%",
  },
  fileInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
  },
  fileTypeIcon: {
    marginBottom: 8,
  },
  fileName: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  fileSize: {
    color: Colors.grey,
    fontSize: 14,
    marginTop: 4,
  },
});
