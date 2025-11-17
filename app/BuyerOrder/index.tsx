import BuyerOrder from "@/components/app/BuyerOrder";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 👉 Register header এ যেটা দেখাবো (logo + text)
const RegisterHeaderTitle = () => {
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

          // 🔹 custom header content (AgriXpert logo row)
          headerTitle: () => <RegisterHeaderTitle />,
          headerTitleAlign: "left",

          // 🔹 custom back button → সবসময় Home এ
          headerLeft: () => (
            <Pressable
              onPress={() => router.push("/BuyerDashboard")} // 👈 back e HomeScreen
              style={{ marginLeft: 8, marginRight: 8 }}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </Pressable>
          ),

          // 🔹 Login header এর মতই সাদা background
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTintColor: "#000",
          animation: "slide_from_right",
        }}
      />

      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <BuyerOrder />
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
  // 🔹 Login header er moto: সবুজ box, ভেতরে A সাদা
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
