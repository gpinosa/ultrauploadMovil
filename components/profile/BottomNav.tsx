// import { View, Text, StyleSheet, Pressable } from "react-native";
// import { useRouter, usePathname } from "expo-router";
// import { Feather } from "@expo/vector-icons";

// export function BottomNav() {
//   const router = useRouter();
//   const pathname = usePathname();

//   return (
//     <View style={styles.container}>
//       <Pressable style={styles.tab} onPress={() => router.push("/")}>
//         <Feather
//           name="home"
//           size={24}
//           color={pathname === "/" ? "#1d9bf0" : "#71767b"}
//         />
//         <Text
//           style={[styles.tabText, pathname === "/" && styles.activeTabText]}
//         >
//           Inicio
//         </Text>
//       </Pressable>

//       <Pressable style={styles.tab} onPress={() => router.push("/search")}>
//         <Feather
//           name="search"
//           size={24}
//           color={pathname === "/search" ? "#1d9bf0" : "#71767b"}
//         />
//         <Text
//           style={[
//             styles.tabText,
//             pathname === "/search" && styles.activeTabText,
//           ]}
//         >
//           Buscar
//         </Text>
//       </Pressable>

//       <Pressable style={styles.tab} onPress={() => router.push("/profile")}>
//         <Feather
//           name="user"
//           size={24}
//           color={pathname.includes("/profile") ? "#1d9bf0" : "#71767b"}
//         />
//         <Text
//           style={[
//             styles.tabText,
//             pathname.includes("/profile") && styles.activeTabText,
//           ]}
//         >
//           Perfil
//         </Text>
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 10,
//     backgroundColor: "#000000",
//     borderTopWidth: 1,
//     borderTopColor: "#2f3336",
//   },
//   tab: {
//     alignItems: "center",
//     paddingVertical: 4,
//   },
//   tabText: {
//     fontSize: 12,
//     color: "#71767b",
//     marginTop: 4,
//   },
//   activeTabText: {
//     color: "#1d9bf0",
//   },
// });
