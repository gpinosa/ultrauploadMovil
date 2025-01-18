import { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { useProfile } from "./ProfileContext";

interface IEditProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

export function EditProfileModal({ visible, onClose }: IEditProfileModalProps) {
  const { profileData, updateProfile } = useProfile();
  const [formData, setFormData] = useState({
    username: profileData.username,
    bio: profileData.bio,
    website: profileData.website,
    profileImage: profileData.profileImage,
    socialLinks: { ...profileData.socialLinks },
  });

  useEffect(() => {
    if (visible) {
      setFormData({
        username: profileData.username,
        bio: profileData.bio,
        website: profileData.website,
        profileImage: profileData.profileImage,
        socialLinks: { ...profileData.socialLinks },
      });
    }
  }, [visible, profileData]);

  const handlePickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permiso Denegado",
          "Necesitamos acceso a tu galería para cambiar la foto de perfil."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setFormData((prev) => ({
          ...prev,
          profileImage: result.assets[0].uri,
        }));
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo seleccionar la imagen");
    }
  };

  const handleSocialLinkChange = (
    platform: keyof typeof formData.socialLinks,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  const handleSave = () => {
    updateProfile(formData);
    Alert.alert("Éxito", "Perfil actualizado correctamente", [
      { text: "OK", onPress: onClose },
    ]);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={24} color="#fff" />
            </Pressable>
            <Text style={styles.title}>Editar Perfil</Text>
            <Pressable onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Guardar</Text>
            </Pressable>
          </View>

          <ScrollView style={styles.form}>
            <Pressable style={styles.imageButton} onPress={handlePickImage}>
              <Feather name="camera" size={24} color="#1d9bf0" />
              <Text style={styles.imageButtonText}>Cambiar foto de perfil</Text>
            </Pressable>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                value={formData.username}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, username: text }))
                }
                placeholder="Tu nombre"
                placeholderTextColor="#71767b"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Biografía</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.bio}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, bio: text }))
                }
                placeholder="Cuéntanos sobre ti"
                placeholderTextColor="#71767b"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Sitio Web</Text>
              <TextInput
                style={styles.input}
                value={formData.website}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, website: text }))
                }
                placeholder="https://..."
                placeholderTextColor="#71767b"
                keyboardType="url"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Redes Sociales</Text>

              <View style={styles.inputGroup}>
                <View style={styles.socialInputContainer}>
                  <Feather name="linkedin" size={20} color="#1d9bf0" />
                  <TextInput
                    style={[styles.input, styles.socialInput]}
                    value={formData.socialLinks.linkedin}
                    onChangeText={(text) =>
                      handleSocialLinkChange("linkedin", text)
                    }
                    placeholder="URL de LinkedIn"
                    placeholderTextColor="#71767b"
                    keyboardType="url"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.socialInputContainer}>
                  <Feather name="instagram" size={20} color="#1d9bf0" />
                  <TextInput
                    style={[styles.input, styles.socialInput]}
                    value={formData.socialLinks.instagram}
                    onChangeText={(text) =>
                      handleSocialLinkChange("instagram", text)
                    }
                    placeholder="URL de Instagram"
                    placeholderTextColor="#71767b"
                    keyboardType="url"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.socialInputContainer}>
                  <Feather name="twitter" size={20} color="#1d9bf0" />
                  <TextInput
                    style={[styles.input, styles.socialInput]}
                    value={formData.socialLinks.twitter}
                    onChangeText={(text) =>
                      handleSocialLinkChange("twitter", text)
                    }
                    placeholder="URL de Twitter"
                    placeholderTextColor="#71767b"
                    keyboardType="url"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.socialInputContainer}>
                  <Feather name="github" size={20} color="#1d9bf0" />
                  <TextInput
                    style={[styles.input, styles.socialInput]}
                    value={formData.socialLinks.github}
                    onChangeText={(text) =>
                      handleSocialLinkChange("github", text)
                    }
                    placeholder="URL de GitHub"
                    placeholderTextColor="#71767b"
                    keyboardType="url"
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#000000",
    marginTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2f3336",
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  saveButton: {
    backgroundColor: "#1d9bf0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  form: {
    padding: 16,
  },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#2f3336",
    borderRadius: 8,
    marginBottom: 20,
  },
  imageButtonText: {
    color: "#1d9bf0",
    fontSize: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#000000",
    borderWidth: 1,
    borderColor: "#2f3336",
    borderRadius: 8,
    padding: 12,
    color: "#ffffff",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  socialInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  socialInput: {
    flex: 1,
  },
});
