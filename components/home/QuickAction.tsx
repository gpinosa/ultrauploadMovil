import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export interface QuickActionProps {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  label: string;
  onPress: () => void;
}

export const QuickAction: React.FC<QuickActionProps> = ({
  icon,
  label,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.quickAction}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.quickActionContent}>
      <View style={styles.quickActionIconContainer}>
        <MaterialCommunityIcons name={icon} size={24} color="#60A5FA" />
      </View>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  quickAction: {
    width: "48%",
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: "#1a1a1a",
    overflow: "hidden",
  },
  quickActionContent: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  quickActionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(96, 165, 250, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickActionLabel: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
});
