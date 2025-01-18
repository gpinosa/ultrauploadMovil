import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface UserItemProps {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
}

export const UserItem: React.FC<UserItemProps> = ({
  name,
  username,
  bio,
  followers,
}) => (
  <TouchableOpacity style={styles.userItem}>
    <View style={styles.userInfo}>
      <Text style={styles.userName}>{name}</Text>
      <Text style={styles.userUsername}>@{username}</Text>
      <Text style={styles.userBio}>{bio}</Text>
      <Text style={styles.userFollowers}>{followers} seguidores</Text>
    </View>
    <MaterialCommunityIcons
      name="chevron-right"
      size={24}
      color={Colors.grey}
      style={styles.userArrow}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  userItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  userInfo: {
    flex: 1,
  },
  userArrow: {
    marginLeft: 8,
  },
  userName: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  userUsername: {
    color: Colors.grey,
    fontSize: 14,
    marginBottom: 4,
  },
  userBio: {
    color: Colors.white,
    fontSize: 14,
    marginBottom: 4,
  },
  userFollowers: {
    color: Colors.grey,
    fontSize: 12,
  },
});
