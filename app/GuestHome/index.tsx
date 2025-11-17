import GuestDashboard from "@/components/app/GuestDashboard";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 👉 Guest screen এর header এ যেটা দেখাবো (logo + text)
const GuestHeaderTitle = () => {
  return (
    <View style={styles.headerBrand}>
      <View style={styles.logoBox}>
        <Text style={styles.logoText}>A</Text>
      </View>
      <View>
        <Text style={styles.appName}>AgriXpert</Text>
        <Text style={styles.subtitle}>Guest Mode-Limited Access</Text>
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

          // 🔹 custom header content (AgriXpert logo row)
          headerTitle: () => <GuestHeaderTitle />,
          headerTitleAlign: "left",

          // 🔹 custom back button → সবসময় Home এ
          headerLeft: () => (
            <Pressable
              onPress={() => router.push("/")} // 👈 back e HomeScreen
              style={{ marginLeft: 8, marginRight: 8 }}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </Pressable>
          ),

          // 🔹 Login/Register header এর মতই সাদা background
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTintColor: "#000",
          animation: "slide_from_right",
        }}
      />

      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <GuestDashboard />
      </SafeAreaView>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({
  headerBrand: {
    flexDirection: "row",
    alignItems: "center",
  },
  // 🔹 AgriXpert logo box
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

  // 🔹 Title কালো
  appName: { fontSize: 18, fontWeight: "bold", color: "#000" },

  // 🔹 Subtitle হালকা ধূসর
  subtitle: { fontSize: 12, color: "#555" },
});
