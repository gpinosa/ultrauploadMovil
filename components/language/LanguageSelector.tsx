import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const languages = [
    { code: "es", name: "Español" },
    { code: "en", name: "English" },
  ];

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="translate" size={24} color={Colors.grey} />
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.languageButton,
            currentLanguage === lang.code && styles.activeLanguage,
          ]}
          onPress={() => onLanguageChange(lang.code)}
        >
          <Text
            style={[
              styles.languageText,
              currentLanguage === lang.code && styles.activeLanguageText,
            ]}
          >
            {lang.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a1a",
    padding: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    marginHorizontal: 4,
  },
  activeLanguage: {
    backgroundColor: Colors.primary,
  },
  languageText: {
    color: Colors.grey,
    fontSize: 14,
  },
  activeLanguageText: {
    color: Colors.white,
    fontWeight: "500",
  },
});
