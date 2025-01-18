import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface PopularContentProps {
  title: string;
  views: string;
  likes: string;
  thumbnail: string;
  author: string;
  authorAvatar: string;
}

export const PopularContent: React.FC<PopularContentProps> = ({
  title,
  views,
  likes,
  author,
}) => (
  <TouchableOpacity style={styles.popularItem}>
    <View style={styles.thumbnailContainer}>
      <View style={styles.playButtonContainer}>
        <MaterialCommunityIcons
          name="play-circle"
          size={48}
          color="white"
          style={styles.playButton}
        />
      </View>
    </View>
    <View style={styles.popularInfo}>
      <Text style={styles.popularTitle} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.authorName}>{author}</Text>
      <View style={styles.popularStats}>
        <View style={styles.statItem}>
          <MaterialCommunityIcons name="eye" size={16} color={Colors.grey} />
          <Text style={styles.popularStatsText}>{views}</Text>
        </View>
        <View style={styles.statItem}>
          <MaterialCommunityIcons name="heart" size={16} color={Colors.grey} />
          <Text style={styles.popularStatsText}>{likes}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  popularItem: {
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    alignItems: "center",
  },
  thumbnailContainer: {
    width: 64,
    height: 64,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#2a2a2a",
    marginRight: 12,
  },
  playButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    opacity: 0.9,
  },
  popularInfo: {
    flex: 1,
  },
  popularTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  authorName: {
    color: Colors.grey,
    fontSize: 14,
    marginBottom: 4,
  },
  popularStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  popularStatsText: {
    color: Colors.grey,
    fontSize: 14,
    marginLeft: 4,
  },
});
