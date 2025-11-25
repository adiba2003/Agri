import LoginScreen from "@/components/app/LoginScreen";
import { Stack, router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 👉 এই ছোট কম্পোনেন্টটাই Stack header এ দেখাবো
const LoginHeaderTitle = () => {
  return (
    <View style={styles.headerBrand}>
      <View style={styles.logoBox}>
        <Text style={styles.logoText}>A</Text>
      </View>
      <View>
        <Text style={styles.appName}>AgriXpert</Text>
        <Text style={styles.subtitle}>Smart Agriculture Platform</Text>
      </View>
    </View>
  );
};

const Index = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,

          // 🔹 Custom header content (AgriXpert logo row)
          headerTitle: () => <LoginHeaderTitle />,
          headerTitleAlign: "left",

          // 🔹 Custom back button → সবসময় HomeScreen এ পাঠাবে
          headerLeft: () => (
            <Pressable
              onPress={() => router.push("/")} // 👉 back dile home e
              style={{ marginLeft: 8, marginRight: 8 }}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </Pressable>
          ),

          headerStyle: {
            backgroundColor: "#ffffff", // header background
          },
          headerTintColor: "#000",
          animation: "slide_from_right",
        }}
      />
      <View style={{ backgroundColor: "#ffff", flex: 1 }}>
        <LoginScreen />
      </View>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({
  headerBrand: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoBox: {
    backgroundColor: "#28a745",
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  logoText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  appName: { fontSize: 18, fontWeight: "bold", color: "#000" },
  subtitle: { fontSize: 12, color: "#555" },
});
