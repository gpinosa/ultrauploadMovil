import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { RecentFile } from "./RecentFile";
import { UserItem } from "./UserItem";
import { PopularContent } from "./PopularContent";

export const SearchScreen: React.FC = () => {
  const recentFiles = [
    {
      name: "Informe_Q2_2025.pdf",
      type: "pdf",
      size: "2.3 MB",
      date: "Hace 2d",
    },
    {
      name: "Diseño_Logo_Empresa.png",
      type: "image",
      size: "4.7 MB",
      date: "Hace 5d",
    },
    {
      name: "Presentación_Proyecto.pdf",
      type: "pdf",
      size: "8.1 MB",
      date: "Hace 1s",
    },
  ];

  const users = [
    {
      name: "María García",
      username: "mariagarcia",
      avatar: " ",
      bio: "Diseñadora UX/UI | Amante de la tecnología",
      followers: 1234,
    },
    {
      name: "Carlos Rodríguez",
      username: "carlosr",
      avatar: " ",
      bio: "Desarrollador Full Stack",
      followers: 987,
    },
    {
      name: "Ana Martínez",
      username: "anamtz",
      avatar: " ",
      bio: "Fotógrafa profesional | Viajera incansable",
      followers: 2345,
    },
  ];

  const popularContent = [
    {
      title: "Cómo optimizar tus archivos para subir más rápido",
      views: "15.2k",
      likes: "1.3k",
      thumbnail: " ",
      author: "Tech Master",
      authorAvatar: " ",
    },
    {
      title: "10 trucos para organizar tus documentos en la nube",
      views: "8.7k",
      likes: "956",
      thumbnail: " ",
      author: "Cloud Expert",
      authorAvatar: " ",
    },
    {
      title: "Guía de seguridad para compartir archivos en línea",
      views: "12.4k",
      likes: "2.1k",
      thumbnail: " ",
      author: "Security Pro",
      authorAvatar: " ",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color={Colors.grey}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar en UltraUpload"
            placeholderTextColor={Colors.grey}
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.resultsSections}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Archivos Recientes</Text>
            {recentFiles.map((file, index) => (
              <RecentFile key={index} {...file} />
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Usuarios</Text>
            {users.map((user, index) => (
              <UserItem key={index} {...user} />
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contenido Popular</Text>
            {popularContent.map((content, index) => (
              <PopularContent key={index} {...content} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2f3336",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 46,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.white,
    height: "100%",
    paddingVertical: 8,
  },
  content: {
    flex: 1,
  },
  resultsSections: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.white,
    marginBottom: 12,
  },
});
