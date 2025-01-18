import { View, StyleSheet } from "react-native";
import { UserProfile } from "@/components/profile/UserProfile";
import { useAuth } from "@/context/AuthContext";

export default function ProfileTab() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <UserProfile username={user?.username || "Usuario"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
});
