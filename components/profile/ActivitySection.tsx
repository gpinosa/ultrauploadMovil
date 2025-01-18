import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";

interface IActivityItem {
  id: string;
  type: "post" | "comment" | "achievement" | "star";
  title: string;
  description: string;
  time: string;
}

const recentActivity: IActivityItem[] = [
  {
    id: "1",
    type: "post",
    title: "Nueva Publicación",
    description: "Compartió un nuevo artículo sobre desarrollo web",
    time: "Hace 2 horas",
  },
  {
    id: "2",
    type: "comment",
    title: "Nuevo Comentario",
    description: 'Comentó en "Mejores prácticas de React"',
    time: "Hace 5 horas",
  },
  {
    id: "3",
    type: "star",
    title: "Coleccionista",
    description: "Añadió en su lista de favoritos una publicacion",
    time: "Hace 1 día",
  },
];

function ActivityCard({ item }: { item: IActivityItem }) {
  const getIcon = () => {
    switch (item.type) {
      case "post":
        return "file-text";
      case "comment":
        return "message-circle";
      case "star":
        return "star";
      default:
        return "activity";
    }
  };

  return (
    <Pressable style={styles.activityCard}>
      <View style={styles.iconContainer}>
        <Feather
          name={getIcon()}
          size={Fonts.sizes.medium}
          color={Colors.white}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </Pressable>
  );
}

export function ActivitySection() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Actividad Reciente</Text>
        <Pressable>
          <Text style={styles.viewAll}>Ver todo</Text>
        </Pressable>
      </View>

      <View style={styles.activityList}>
        {recentActivity.map((item) => (
          <ActivityCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: Fonts.sizes.medium,
    fontWeight: "bold",
    color: "#ffffff",
  },
  viewAll: {
    fontSize: Fonts.sizes.regular,
    color: "#1d9bf0",
  },
  activityList: {
    gap: 12,
  },
  activityCard: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#16181c",
    borderRadius: 12,
    gap: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1d9bf0",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#71767b",
    marginBottom: 8,
  },
  time: {
    fontSize: 12,
    color: "#71767b",
  },
});
