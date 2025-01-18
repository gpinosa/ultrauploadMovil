import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { EditProfileModal } from "./EditProfileModal";
import { ProfileTabs } from "./ProfileTabs";
import { ActivitySection } from "./ActivitySection";
import { useProfile } from "./ProfileContext";
import * as Linking from "expo-linking";

interface IUserProfileProps {
  username: string;
}

export function UserProfile({ username }: IUserProfileProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { profileData } = useProfile();

  const socialLinks = [
    { icon: "linkedin", url: profileData.socialLinks.linkedin },
    { icon: "instagram", url: profileData.socialLinks.instagram },
    { icon: "twitter", url: profileData.socialLinks.twitter },
    { icon: "github", url: profileData.socialLinks.github },
  ];

  const handleSocialPress = async (url: string) => {
    if (!url) return;

    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: profileData.profileImage }}
          style={styles.profileImage}
          contentFit="cover"
        />

        <Text style={styles.username}>{profileData.username}</Text>
        <Text style={styles.memberSince}>Miembro desde 21 octubre 2024</Text>

        <Text style={styles.bio}>{profileData.bio}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1.2K</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>450</Text>
            <Text style={styles.statLabel}>Siguiendo</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>89</Text>
            <Text style={styles.statLabel}>Publicaciones</Text>
          </View>
        </View>

        <View style={styles.socialLinks}>
          {socialLinks.map((link, index) => (
            <Pressable
              key={index}
              style={[
                styles.socialButton,
                !link.url && styles.socialButtonDisabled,
              ]}
              onPress={() => handleSocialPress(link.url)}
              disabled={!link.url}
            >
              <Feather name={link.icon as any} size={24} color="#fff" />
            </Pressable>
          ))}
        </View>

        <Pressable
          style={styles.editButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </Pressable>
      </View>

      <EditProfileModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
      <ProfileTabs />
      <ActivitySection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  profileContainer: {
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: "#1d9bf0",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: "#71767b",
    marginBottom: 16,
  },
  bio: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 24,
  },
  statItem: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  statLabel: {
    fontSize: 14,
    color: "#71767b",
  },
  socialLinks: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#16181c",
    justifyContent: "center",
    alignItems: "center",
  },
  socialButtonDisabled: {
    opacity: 0.5,
  },
  editButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: "#1d9bf0",
  },
  editButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
