import React, { useRef, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { LanguageSelector } from "@/components/language/LanguageSelector";
import { Colors } from "@/constants/Colors";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [getFormulario, setFormulario] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [currentLanguage, setCurrentLanguage] = useState("es");

  let refPassword = useRef<TextInput>(null);

  const handleLogin = async () => {
    if (!getFormulario.email || !getFormulario.password) {
      Alert.alert("Error", "Hay que completar todos los campos");
      return;
    }

    try {
      await login(getFormulario.email, getFormulario.password);
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "No se pudo iniciar sesión");
    }
  };

  const handleForgotPassword = () => {
    console.log("recuperar contraseña");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    // Aquí puedes agregar la lógica para cambiar el idioma en toda la aplicación
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={20}
        extraHeight={120}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/file.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Accede a UltraUpload</Text>
          <Text style={styles.subtitle}>
            Accede a tus proyectos y a otras ideas.
          </Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#666666"
              keyboardType="email-address"
              autoCapitalize="none"
              value={getFormulario.email}
              onChangeText={(email) =>
                setFormulario({ ...getFormulario, email })
              }
              onSubmitEditing={() => refPassword.current?.focus()}
            />

            <TextInput
              ref={refPassword}
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#666666"
              secureTextEntry
              value={getFormulario.password}
              onChangeText={(password) =>
                setFormulario({ ...getFormulario, password })
              }
              onSubmitEditing={handleLogin}
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleForgotPassword}
              style={styles.forgotPassword}
            >
              <Text style={styles.forgotPasswordText}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleRegister}
              style={styles.registerLink}
            >
              <Text style={styles.registerText}>
                ¿Aún no tienes cuenta?{" "}
                <Text style={styles.registerTextHighlight}>Regístrate</Text>
              </Text>
            </TouchableOpacity>

            <View style={styles.languageContainer}>
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  logo: {
    width: 40,
    height: 40,
    tintColor: "#3b82f6",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.white,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 32,
    textAlign: "center",
  },
  form: {
    width: "100%",
    maxWidth: 320,
  },
  input: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: Colors.white,
  },
  loginButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  forgotPassword: {
    marginTop: 16,
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "#3b82f6",
    fontSize: 14,
  },
  registerLink: {
    marginTop: 32,
    alignItems: "center",
  },
  registerText: {
    color: "#666666",
    fontSize: 14,
  },
  registerTextHighlight: {
    color: "#3b82f6",
    fontWeight: "600",
  },
  languageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
