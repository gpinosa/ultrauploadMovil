import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

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
      if (userJson) {
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
    setIsLoading(true);
    try {
      // Simular una llamada a la API
      const mockUser: User = {
        id: "1",
        username: "testuser",
        email: email,
        avatarUrl: "https://example.com/avatar.jpg",
        nombre: "Test",
        apellido: "User",
        fechaNacimiento: new Date("1990-01-01"),
        DNI: "12345678A",
      };

      await AsyncStorage.setItem("@user", JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      // Here you would typically make an API call to your backend to register the user
      // For this example, we'll simulate a successful registration
      const mockUser: User = {
        id: "2",
        username: data.nombreUsuario,
        email: data.email,
        avatarUrl: "https://example.com/avatar.jpg",
        nombre: data.nombre,
        apellido: data.apellido,
        fechaNacimiento: data.fechaNacimiento,
        DNI: data.DNI,
      };

      await AsyncStorage.setItem("@user", JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem("@user");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
