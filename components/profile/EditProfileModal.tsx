import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useProfile } from "./ProfileContext";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

interface UpdatedProfile {
  nombre: string;
  apellido: string;
  email: string;
  DNI: string;
  fechaNacimiento: Date;
  bio: string;
  website: string;
  linkedin: string;
  github: string;
  instagram: string;
  twitter: string;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onClose,
}) => {
  const { bio, setBio, website, setWebsite, socialLinks, setSocialLinks } =
    useProfile();
  const [profile, setProfile] = useState<UpdatedProfile>({
    nombre: "",
    apellido: "",
    email: "",
    DNI: "",
    fechaNacimiento: new Date(),
    bio,
    website,
    linkedin: socialLinks.linkedin,
    github: socialLinks.github,
    instagram: socialLinks.instagram,
    twitter: socialLinks.twitter,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (key: keyof UpdatedProfile, value: string | Date) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setBio(profile.bio);
    setWebsite(profile.website);
    setSocialLinks({
      linkedin: profile.linkedin,
      github: profile.github,
      instagram: profile.instagram,
      twitter: profile.twitter,
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={Colors.white}
                />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Editar perfil</Text>
              <TouchableOpacity onPress={handleSave}>
                <Text style={styles.saveButton}>Guardar</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                  style={styles.input}
                  value={profile.nombre}
                  onChangeText={(text) => handleChange("nombre", text)}
                  placeholder="Nombre"
                  placeholderTextColor={Colors.grey}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Apellido</Text>
                <TextInput
                  style={styles.input}
                  value={profile.apellido}
                  onChangeText={(text) => handleChange("apellido", text)}
                  placeholder="Apellido"
                  placeholderTextColor={Colors.grey}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={profile.email}
                  onChangeText={(text) => handleChange("email", text)}
                  placeholder="Email"
                  placeholderTextColor={Colors.grey}
                  keyboardType="email-address"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>DNI</Text>
                <TextInput
                  style={styles.input}
                  value={profile.DNI}
                  onChangeText={(text) => handleChange("DNI", text)}
                  placeholder="DNI"
                  placeholderTextColor={Colors.grey}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Fecha de nacimiento</Text>
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.datePickerButtonText}>
                    {profile.fechaNacimiento.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Biografía</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={profile.bio}
                  onChangeText={(text) => handleChange("bio", text)}
                  placeholder="Cuéntanos sobre ti"
                  placeholderTextColor={Colors.grey}
                  multiline
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Sitio web</Text>
                <TextInput
                  style={styles.input}
                  value={profile.website}
                  onChangeText={(text) => handleChange("website", text)}
                  placeholder="https://tuwebsite.com"
                  placeholderTextColor={Colors.grey}
                  keyboardType="url"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>LinkedIn</Text>
                <TextInput
                  style={styles.input}
                  value={profile.linkedin}
                  onChangeText={(text) => handleChange("linkedin", text)}
                  placeholder="https://linkedin.com/in/usuario"
                  placeholderTextColor={Colors.grey}
                  keyboardType="url"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>GitHub</Text>
                <TextInput
                  style={styles.input}
                  value={profile.github}
                  onChangeText={(text) => handleChange("github", text)}
                  placeholder="https://github.com/usuario"
                  placeholderTextColor={Colors.grey}
                  keyboardType="url"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Instagram</Text>
                <TextInput
                  style={styles.input}
                  value={profile.instagram}
                  onChangeText={(text) => handleChange("instagram", text)}
                  placeholder="https://instagram.com/usuario"
                  placeholderTextColor={Colors.grey}
                  keyboardType="url"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Twitter</Text>
                <TextInput
                  style={styles.input}
                  value={profile.twitter}
                  onChangeText={(text) => handleChange("twitter", text)}
                  placeholder="https://twitter.com/usuario"
                  placeholderTextColor={Colors.grey}
                  keyboardType="url"
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
      {showDatePicker && (
        <DateTimePicker
          value={profile.fechaNacimiento}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              handleChange("fechaNacimiento", selectedDate);
            }
          }}
        />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.black,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2f3336",
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  saveButton: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollView: {
    maxHeight: "80%",
  },
  inputContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  label: {
    color: Colors.grey,
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    padding: 12,
    color: Colors.white,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  datePickerButton: {
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    padding: 12,
  },
  datePickerButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});
