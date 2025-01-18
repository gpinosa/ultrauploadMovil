import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { BlurView } from "expo-blur";

interface HeaderProps {
  onNotificationPress: () => void;
  avatarUrl?: string;
  onEditProfile: () => void;
  onSettings: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNotificationPress,
  avatarUrl,
  onEditProfile,
  onSettings,
  onLogout,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuAnimation = useState(new Animated.Value(-50))[0];
  const fadeAnimation = useState(new Animated.Value(0))[0];

  const animateMenu = (visible: boolean) => {
    Animated.parallel([
      Animated.timing(menuAnimation, {
        toValue: visible ? 0 : -50,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimation, {
        toValue: visible ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const toggleMenu = () => {
    if (!isMenuVisible) {
      setIsMenuVisible(true);
      animateMenu(true);
    } else {
      animateMenu(false);
      setTimeout(() => setIsMenuVisible(false), 300);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons
            name="cloud-upload"
            size={24}
            color={Colors.primary}
          />
          <Text style={styles.logoText}>UltraUpload</Text>
        </View>
        <View style={styles.rightContainer}>
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
          <TouchableOpacity onPress={toggleMenu}>
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color={Colors.grey}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleMenu}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={toggleMenu}
        >
          <BlurView intensity={30} style={styles.blurView}>
            <Animated.View
              style={[
                styles.menuAnimation,
                {
                  transform: [{ translateY: menuAnimation }],
                  opacity: fadeAnimation,
                },
              ]}
            >
              <View style={styles.menuContainer}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    onEditProfile();
                    toggleMenu();
                  }}
                >
                  <MaterialCommunityIcons
                    name="account-edit"
                    size={24}
                    color={Colors.white}
                  />
                  <Text style={styles.menuText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    onSettings();
                    toggleMenu();
                  }}
                >
                  <MaterialCommunityIcons
                    name="cog"
                    size={24}
                    color={Colors.white}
                  />
                  <Text style={styles.menuText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    onLogout();
                    toggleMenu();
                  }}
                >
                  <MaterialCommunityIcons
                    name="logout"
                    size={24}
                    color={Colors.white}
                  />
                  <Text style={styles.menuText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </BlurView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    borderBottomWidth: 1,
    borderBottomColor: "#2f3336",
    paddingTop: 8,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 48,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
  },
  rightContainer: {
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
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2f3336",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 60,
  },
  blurView: {
    borderRadius: 8,
    overflow: "hidden",
    margin: 10,
  },
  menuContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 8,
    padding: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  menuText: {
    color: Colors.white,
    marginLeft: 12,
    fontSize: 16,
  },
  menuAnimation: {
    transform: [{ translateY: 0 }],
    opacity: 1,
  },
});
