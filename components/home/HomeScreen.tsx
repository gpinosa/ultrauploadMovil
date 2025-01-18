import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { Header } from "@/components/profile/Header";
import { UploadModal } from "@/components/home/UploadModal";
import { useAuth } from "@/context/AuthContext";
import { QuickAction, QuickActionProps } from "./QuickAction";
import { ActivityItem } from "./ActivityItem";
import { FeaturedFile } from "./FeaturedFile";

const { width: screenWidth } = Dimensions.get("window");

export const HomeScreen: React.FC = () => {
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const { user } = useAuth();

  const handleNotificationPress = () => {
    console.log("Notificaciones presionado");
  };

  const handleUploadPress = () => {
    setIsUploadModalVisible(true);
  };

  const quickActions: QuickActionProps[] = [
    { icon: "upload", label: "Subir", onPress: handleUploadPress },
    {
      icon: "folder",
      label: "Mis Archivos",
      onPress: () => console.log("Mis Archivos presionado"),
    },
    {
      icon: "share-variant",
      label: "Compartir",
      onPress: () => console.log("Compartir presionado"),
    },
    {
      icon: "cog",
      label: "Ajustes",
      onPress: () => console.log("Ajustes presionado"),
    },
  ];

  const recentActivity = [
    { fileName: "Informe_Final.pdf", date: "Hace 2h" },
    { fileName: "Fotos_Vacaciones.zip", date: "Hace 1d" },
    { fileName: "Presentación.pptx", date: "Hace 3d" },
  ];

  const featuredFiles = [
    {
      name: "Proyecto_2023.docx",
      size: "2.3 MB",
      thumbnail: "https://picsum.photos/400/300?random=1",
    },
    {
      name: "Logo_Empresa.png",
      size: "1.1 MB",
      thumbnail: "https://picsum.photos/400/300?random=2",
    },
    {
      name: "Video_Presentación.mp4",
      size: "15.7 MB",
      thumbnail: "https://picsum.photos/400/300?random=3",
    },
  ];

  return (
    <LinearGradient
      colors={[Colors.black, Colors.black]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <Header
          onNotificationPress={handleNotificationPress}
          avatarUrl={user?.avatarUrl}
        />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
              <View style={styles.quickActionsContainer}>
                {quickActions.map((action, index) => (
                  <QuickAction key={index} {...action} />
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Actividad Reciente</Text>
              {recentActivity.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Archivos Destacados</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.featuredFilesScroll}
              >
                {featuredFiles.map((file, index) => (
                  <View key={index} style={styles.featuredFileContainer}>
                    <FeaturedFile item={file} />
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <UploadModal
        isVisible={isUploadModalVisible}
        onClose={() => setIsUploadModalVisible(false)}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.white,
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  featuredFilesScroll: {
    marginHorizontal: -20,
  },
  featuredFileContainer: {
    paddingHorizontal: 10,
  },
});
