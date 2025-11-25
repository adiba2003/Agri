import BuyerDashboard from "@/components/app/BuyerDashboard";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
          headerTitle: () => <RegisterHeaderTitle />,
          headerTitleAlign: "left",

          headerLeft: () => (
            <Pressable
              onPress={() => router.push("/")}
              style={{ marginLeft: 8, marginRight: 8 }}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </Pressable>
          ),

          // ❌ headerRight সম্পূর্ণ বাদ
          // headerRight: undefined,

          headerStyle: { backgroundColor: "#ffffff" },
          headerTintColor: "#000",
          animation: "slide_from_right",
        }}
      />

      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <BuyerDashboard />
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
