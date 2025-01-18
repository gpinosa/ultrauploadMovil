import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  onNotificationPress: () => void;
  avatarUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onNotificationPress,
  avatarUrl,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons
            name="cloud-upload"
            size={24}
            color={Colors.primary}
          />
          <Text style={styles.logoText}>UltraUpload</Text>
        </View>
        <View style={styles.userContainer}>
          <TouchableOpacity
            onPress={onNotificationPress}
            style={styles.notificationButton}
          >
            <MaterialCommunityIcons
              name="bell-outline"
              size={24}
              color={Colors.white}
            />
          </TouchableOpacity>
          {avatarUrl && (
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    borderBottomWidth: 1,
    borderBottomColor: "#2f3336",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  notificationButton: {
    padding: 4,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});
