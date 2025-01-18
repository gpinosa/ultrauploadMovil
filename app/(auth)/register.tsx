import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardTypeOptions,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LanguageSelector } from "@/components/language/LanguageSelector";

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();

  const [getFormulario, setFormulario] = useState<{
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    nombreUsuario: string;
    fechaNacimiento: Date | null;
    DNI: string;
  }>({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    nombreUsuario: "",
    fechaNacimiento: null,
    DNI: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("es");

  const handleRegister = async () => {
    if (
      !getFormulario.email ||
      !getFormulario.password ||
      !getFormulario.DNI ||
      !getFormulario.nombre ||
      !getFormulario.apellido ||
      !getFormulario.nombreUsuario ||
      getFormulario.fechaNacimiento === null
    ) {
      Alert.alert("Error", "Hay que completar todos los campos");
      return;
    }

    try {
      await register({
        ...getFormulario,
        fechaNacimiento: getFormulario.fechaNacimiento!,
      });
    } catch (error) {
      Alert.alert("Error", "No se pudo completar el registro");
    }
  };

  const handleLogin = () => {
    router.back();
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setFormulario({ ...getFormulario, fechaNacimiento: selectedDate });
    }
  };

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    // Aquí puedes agregar la lógica para cambiar el idioma en toda la aplicación
  };

  const entradasRegistro = (
    nombre: string,
    keyboardType: KeyboardTypeOptions,
    placeholder: string,
    tipoInput: keyof typeof getFormulario
  ) => {
    if (tipoInput === "fechaNacimiento") {
      return (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text
            style={[
              styles.dateText,
              !getFormulario.fechaNacimiento && styles.placeholderText,
            ]}
          >
            {getFormulario.fechaNacimiento
              ? getFormulario.fechaNacimiento.toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "Seleccionar fecha de nacimiento"}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <TextInput
        style={styles.input}
        placeholder={nombre}
        placeholderTextColor="#666666"
        keyboardType={keyboardType}
        value={getFormulario[tipoInput]}
        secureTextEntry={tipoInput === "password"}
        onChangeText={(text) =>
          setFormulario({ ...getFormulario, [tipoInput]: text })
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/file.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Únete a UltraUpload</Text>
          <Text style={styles.subtitle}>
            Crea una cuenta para acceder a todas las funciones.
          </Text>

          <View style={styles.form}>
            {entradasRegistro(
              "Correo electrónico",
              "email-address",
              "tudireccion@correo.com",
              "email"
            )}
            {entradasRegistro(
              "Contraseña",
              "default",
              "***********",
              "password"
            )}
            {entradasRegistro("Nombre", "default", "Pepe", "nombre")}
            {entradasRegistro("Apellido", "default", "Gonzalez", "apellido")}
            {entradasRegistro(
              "Nombre de usuario",
              "default",
              "tu_nombre_usuario",
              "nombreUsuario"
            )}
            {entradasRegistro("DNI", "default", "12345678", "DNI")}
            {entradasRegistro(
              "Fecha de nacimiento",
              "default",
              "dd/mm/yyyy",
              "fechaNacimiento"
            )}

            {showDatePicker && (
              <DateTimePicker
                value={getFormulario.fechaNacimiento || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
                minimumDate={new Date("1900-01-01")}
              />
            )}

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>Registrarse</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogin} style={styles.loginLink}>
              <Text style={styles.loginText}>
                ¿Ya tienes cuenta?{" "}
                <Text style={styles.loginTextHighlight}>Inicia Sesión</Text>
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
    backgroundColor: "#000000",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
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
    color: "#ffffff",
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
    color: "#ffffff",
  },
  dateText: {
    color: "#ffffff",
    fontSize: 16,
  },
  placeholderText: {
    color: "#666666",
  },
  registerButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  registerButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginLink: {
    marginTop: 32,
    alignItems: "center",
  },
  loginText: {
    color: "#666666",
    fontSize: 14,
  },
  loginTextHighlight: {
    color: "#3b82f6",
    fontWeight: "600",
  },
  languageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
