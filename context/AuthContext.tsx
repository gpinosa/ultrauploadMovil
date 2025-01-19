import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, registerUser } from "../services/api";

interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  DNI: string;
}

interface RegisterData {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  fechaNacimiento: Date;
  DNI: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  language: string;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  setLanguage: (lang: string) => Promise<void>;
  updateAvatar: (newAvatarUrl: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguageState] = useState("es");

  useEffect(() => {
    checkUserLoggedIn();
    loadLanguage();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const userJson = await AsyncStorage.getItem("@user");
      const token = await AsyncStorage.getItem("@token");
      if (userJson && token) {
        setUser(JSON.parse(userJson));
      }
    } catch (error) {
      console.error("Error checking user login status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem("@language");
      if (savedLanguage) {
        setLanguageState(savedLanguage);
      }
    } catch (error) {
      console.error("Error loading language:", error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { token, user } = await loginUser(email, password);
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      await AsyncStorage.setItem("@token", token);
      setUser(user);
    } catch (error) {
      if (error instanceof Error) {
        // Remove any technical details from the error message
        const userMessage = "Email o contraseña incorrectos";
        throw new AuthError(userMessage);
      }
      throw new AuthError("Ha ocurrido un error inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const { token, user } = await registerUser(data);
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      await AsyncStorage.setItem("@token", token);
      setUser(user);
    } catch (error) {
      console.error("Registration error:", error);
      if (error instanceof Error) {
        if (error.message.includes("ya existe")) {
          throw new Error("El email ya está registrado");
        } else {
          throw new Error(
            "Error en el registro. Por favor, inténtalo de nuevo más tarde"
          );
        }
      }
      throw new Error("Ha ocurrido un error inesperado durante el registro");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem("@user");
      await AsyncStorage.removeItem("@token");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error("Error al cerrar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  const setLanguage = async (lang: string) => {
    try {
      await AsyncStorage.setItem("@language", lang);
      setLanguageState(lang);
    } catch (error) {
      console.error("Error setting language:", error);
    }
  };

  const updateAvatar = async (newAvatarUrl: string) => {
    if (user) {
      const updatedUser = { ...user, avatarUrl: newAvatarUrl };
      try {
        await AsyncStorage.setItem("@user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } catch (error) {
        console.error("Error updating avatar:", error);
        throw new Error("Error al actualizar el avatar");
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        language,
        login,
        register,
        logout,
        setLanguage,
        updateAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
