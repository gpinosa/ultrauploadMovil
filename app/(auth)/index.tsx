import React, { useRef, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { LanguageSelector } from "@/components/language/LanguageSelector";
import { Colors } from "@/constants/Colors";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordRef = useRef<TextInput>(null);

  const handleLogin = async () => {
    try {
      if (!formData.email || !formData.password) {
        setError("Por favor, completa todos los campos");
        return;
      }

      setIsLoading(true);
      setError(null);

      await login(formData.email, formData.password);
      router.replace("/(tabs)");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ha ocurrido un error inesperado");
      }
    } finally {
      setIsLoading(false);
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
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <TextInput
              style={[styles.input, error && styles.inputError]}
              placeholder="Correo electrónico"
              placeholderTextColor="#666666"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(email) => {
                setFormData((prev) => ({ ...prev, email }));
                setError(null);
              }}
              onSubmitEditing={() => passwordRef.current?.focus()}
              editable={!isLoading}
            />

            <TextInput
              ref={passwordRef}
              style={[styles.input, error && styles.inputError]}
              placeholder="Contraseña"
              placeholderTextColor="#666666"
              secureTextEntry
              value={formData.password}
              onChangeText={(password) => {
                setFormData((prev) => ({ ...prev, password }));
                setError(null);
              }}
              onSubmitEditing={handleLogin}
              editable={!isLoading}
            />

            <TouchableOpacity
              style={[
                styles.loginButton,
                isLoading && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleForgotPassword}
              style={styles.forgotPassword}
              disabled={isLoading}
            >
              <Text style={styles.forgotPasswordText}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleRegister}
              style={styles.registerLink}
              disabled={isLoading}
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
  errorContainer: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ef4444",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: Colors.white,
    borderWidth: 1,
    borderColor: "transparent",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  loginButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  loginButtonDisabled: {
    opacity: 0.7,
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
