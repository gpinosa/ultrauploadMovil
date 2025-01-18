import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { CustomPicker } from "./CustomPicker";

interface UploadModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isVisible,
  onClose,
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [fileSelected, setFileSelected] = useState(false);

  const categoryItems = [
    { label: "Documentos", value: "documentos" },
    { label: "Imágenes", value: "imagenes" },
    { label: "Vídeos", value: "videos" },
    { label: "Otros", value: "otros" },
  ];

  const handleSelectFile = () => {
    setFileSelected(true);
  };

  const handleUpload = () => {
    if (!title || !description || !category || !fileSelected) {
      alert("Por favor, complete todos los campos y seleccione un archivo");
      return;
    }

    setUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setUploading(false);
        setTimeout(() => {
          onClose();
          setUploadProgress(0);
          setTitle("");
          setDescription("");
          setCategory("");
          setFileSelected(false);
        }, 1000);
      }
    }, 500);
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialCommunityIcons
              name="close"
              size={24}
              color={Colors.white}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Subir Archivo</Text>
          {!uploading ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Título del archivo"
                placeholderTextColor={Colors.grey}
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Descripción"
                placeholderTextColor={Colors.grey}
                multiline
                value={description}
                onChangeText={(text) => {
                  // Reemplazar los retornos de carro (\r) con saltos de línea (\n)
                  const newText = text.replace(/\r/g, "\n");
                  setDescription(newText);
                }}
                returnKeyType="default"
                keyboardType="default"
                blurOnSubmit={false}
                textAlignVertical="top"
              />
              <CustomPicker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                items={categoryItems}
                placeholder="Seleccionar categoría"
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.selectButton]}
                  onPress={handleSelectFile}
                >
                  <MaterialCommunityIcons
                    name="file-plus"
                    size={24}
                    color={Colors.white}
                  />
                  <Text style={styles.buttonText}>
                    {fileSelected ? "Cambiar archivo" : "Seleccionar archivo"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.uploadButton]}
                  onPress={handleUpload}
                  disabled={!fileSelected}
                >
                  <MaterialCommunityIcons
                    name="upload"
                    size={24}
                    color={Colors.white}
                  />
                  <Text style={styles.buttonText}>Subir</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.uploadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary} />
              <Text style={styles.uploadingText}>
                Subiendo... {uploadProgress}%
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.black,
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    color: Colors.white,
    fontSize: 16,
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: "top",
    paddingTop: 12,
    paddingBottom: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
  },
  selectButton: {
    backgroundColor: Colors.grey,
    marginRight: 8,
  },
  uploadButton: {
    backgroundColor: Colors.primary,
    marginLeft: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  uploadingContainer: {
    alignItems: "center",
  },
  uploadingText: {
    color: Colors.white,
    marginTop: 10,
    fontSize: 16,
  },
});
