import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Linking,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { EditProfileModal } from "./EditProfileModal";
import { Collapsible } from "../Collapsible";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useProfile } from "./ProfileContext";

interface UserProfileProps {
  username: string;
}

interface StatItemProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label }) => {
  const scaleAnim = React.useRef(new Animated.Value(0.95)).current;

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[styles.statItem, { transform: [{ scale: scaleAnim }] }]}
    >
      <LinearGradient
        colors={["rgba(59, 130, 246, 0.1)", "rgba(59, 130, 246, 0.05)"]}
        style={styles.statGradient}
      >
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color="#60A5FA"
          style={styles.statIcon}
        />
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </LinearGradient>
    </Animated.View>
  );
};

const ActivityItem: React.FC<{
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  text: string;
  time: string;
}> = ({ icon, text, time }) => (
  <View style={styles.activityItem}>
    <View style={styles.activityIconContainer}>
      <MaterialCommunityIcons name={icon} size={20} color="#60A5FA" />
    </View>
    <View style={styles.activityContent}>
      <Text style={styles.activityText}>{text}</Text>
      <Text style={styles.activityTime}>{time}</Text>
    </View>
  </View>
);

export const UserProfile: React.FC<UserProfileProps> = ({ username }) => {
  const { user, updateAvatar } = useAuth();
  const { bio, website, socialLinks } = useProfile();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 150],
    extrapolate: "clamp",
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.6],
    extrapolate: "clamp",
  });

  const handleChangeAvatar = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Se requiere permiso para acceder a la galería de fotos");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      const newAvatarUrl = pickerResult.assets[0].uri;
      try {
        await updateAvatar(newAvatarUrl);
      } catch (error) {
        console.error("Error updating avatar:", error);
        alert(
          "No se pudo actualizar el avatar. Por favor, inténtalo de nuevo."
        );
      }
    }
  };

  const toggleEditModal = () => {
    setIsEditModalVisible(!isEditModalVisible);
  };

  const handleSocialPress = async (url: string) => {
    if (url) {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        alert(`No se puede abrir la URL: ${url}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <LinearGradient
          colors={["rgba(59, 130, 246, 0.1)", "transparent"]}
          style={StyleSheet.absoluteFill}
        />
        <Animated.Image
          source={{ uri: user?.avatarUrl || "https://picsum.photos/200" }}
          style={[styles.headerBackground, { opacity: imageOpacity }]}
          blurRadius={3}
        />
        <BlurView intensity={40} style={StyleSheet.absoluteFill} />
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={handleChangeAvatar}>
            {user?.avatarUrl ? (
              <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <MaterialCommunityIcons
                  name="account"
                  size={40}
                  color={Colors.grey}
                />
              </View>
            )}
            <View style={styles.editIconContainer}>
              <MaterialCommunityIcons
                name="camera"
                size={16}
                color={Colors.white}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.bio}>{bio}</Text>
          <View style={styles.socialLinks}>
            {Object.entries(socialLinks).map(([key, value]) => (
              <TouchableOpacity
                key={key}
                style={styles.socialButton}
                onPress={() => handleSocialPress(value)}
                disabled={!value}
              >
                <MaterialCommunityIcons
                  name={key as keyof typeof MaterialCommunityIcons.glyphMap}
                  size={24}
                  color={value ? Colors.primary : Colors.grey}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.editButton} onPress={toggleEditModal}>
            <MaterialCommunityIcons
              name="pencil"
              size={16}
              color={Colors.white}
              style={styles.editButtonIcon}
            />
            <Text style={styles.editButtonText}>Editar perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <StatItem icon="file-document-outline" value="250" label="Archivos" />
          <StatItem
            icon="database-outline"
            value="10 GB"
            label="Espacio usado"
          />
          <StatItem
            icon="share-variant-outline"
            value="50"
            label="Compartidos"
          />
        </View>

        <View style={styles.sections}>
          <Collapsible title="Información personal" initiallyExpanded={true}>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="account-outline"
                  size={20}
                  color="#60A5FA"
                />
                <View>
                  <Text style={styles.infoLabel}>Nombre</Text>
                  <Text style={styles.infoValue}>
                    {user?.nombre || "No especificado"}
                  </Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="card-account-details-outline"
                  size={20}
                  color="#60A5FA"
                />
                <View>
                  <Text style={styles.infoLabel}>DNI</Text>
                  <Text style={styles.infoValue}>
                    {user?.DNI || "No especificado"}
                  </Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color="#60A5FA"
                />
                <View>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>
                    {user?.email || "No especificado"}
                  </Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="calendar-outline"
                  size={20}
                  color="#60A5FA"
                />
                <View>
                  <Text style={styles.infoLabel}>Fecha de nacimiento</Text>
                  <Text style={styles.infoValue}>
                    {user?.fechaNacimiento
                      ? user.fechaNacimiento.toLocaleDateString()
                      : "No especificada"}
                  </Text>
                </View>
              </View>
            </View>
          </Collapsible>

          <Collapsible title="Actividad reciente">
            <View style={styles.activityContainer}>
              <ActivityItem
                icon="file-upload-outline"
                text="Subió Informe_Final.pdf"
                time="hace 2 horas"
              />
              <ActivityItem
                icon="share-variant-outline"
                text="Compartió Fotos_Vacaciones.zip"
                time="hace 1 día"
              />
              <ActivityItem
                icon="download-outline"
                text="Descargó Presentación.pptx"
                time="hace 3 días"
              />
            </View>
          </Collapsible>
        </View>
      </Animated.ScrollView>

      <EditProfileModal
        visible={isEditModalVisible}
        onClose={toggleEditModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    zIndex: 1,
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  scrollView: {
    flex: 1,
    zIndex: 2,
  },
  profileHeader: {
    alignItems: "center",
    paddingTop: 120,
    paddingBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#2f3336",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  editIconContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    padding: 6,
    borderWidth: 2,
    borderColor: Colors.black,
  },
  username: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
  },
  bio: {
    marginTop: 8,
    fontSize: 16,
    color: Colors.white,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  websiteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  website: {
    marginLeft: 4,
    fontSize: 14,
    color: Colors.primary,
  },
  socialLinks: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  socialButton: {
    marginHorizontal: 8,
    padding: 8,
  },
  editButton: {
    marginTop: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  editButtonIcon: {
    marginRight: 6,
  },
  editButtonText: {
    color: Colors.white,
    fontWeight: "500",
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    marginTop: 20,
  },
  statItem: {
    flex: 1,
    marginHorizontal: 6,
  },
  statGradient: {
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.grey,
  },
  sections: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 12,
    borderRadius: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.grey,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: "500",
  },
  activityContainer: {
    gap: 12,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 12,
    borderRadius: 12,
  },
  activityIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(96, 165, 250, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: "500",
  },
  activityTime: {
    fontSize: 12,
    color: Colors.grey,
    marginTop: 2,
  },
});
