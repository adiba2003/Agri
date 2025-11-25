import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

import { router } from "expo-router";

import cartIcon from "@/assets/cart.png";
import riceIcon from "@/assets/rice.png";

const API_URL = "http://localhost:5000/api/auth/login";

export default function LoginScreen() {
  const [activeTab, setActiveTab] = useState("signin");
  const [role, setRole] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const roles = [
    { name: "Buyer", key: "buyer", image: cartIcon },
    { name: "Farmer", key: "farmer", image: riceIcon },
  ];

  const handleLogin = async () => {
    if (!email || !password || !role) {
      return Alert.alert("Error", "All fields + role are required!");
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        return Alert.alert("Login Failed", data.message);
      }

      Alert.alert("Success", "Login successful");

      // Redirect only after successful login
      if (role === "buyer") {
        router.push("/BuyerDashboard");
      } else {
        router.push("/FarmerDashboard");
      }
    } catch (error) {
      Alert.alert("Network Error", "Could not connect to server");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.welcome}>Welcome</Text>

        <Text style={styles.subtext}>
          Sign in to your account or create a new one
        </Text>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {/* Sign In Tab */}
          <TouchableOpacity
            style={[styles.tab, activeTab === "signin" && styles.activeTab]}
            onPress={() => setActiveTab("signin")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "signin" && styles.activeTabText,
              ]}
            >
              Sign In
            </Text>
          </TouchableOpacity>

          {/* Register Tab */}
          <TouchableOpacity
            style={[styles.tab, activeTab === "register" && styles.activeTab]}
            onPress={() => {
              setActiveTab("register");
              router.push("/register");
            }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "register" && styles.activeTabText,
              ]}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Role Selection */}
        <Text style={styles.label}>Sign in as:</Text>
        <View style={styles.roleRow}>
          {roles.map((r, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.roleBox, role === r.key && styles.activeRole]}
              onPress={() => setRole(r.key)}
            >
              <Image source={r.image} style={styles.roleImage} />
              <Text
                style={[
                  styles.roleText,
                  role === r.key && styles.activeRoleText,
                ]}
              >
                {r.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        {/* Guest Button */}
        <TouchableOpacity
          style={styles.guestButton}
          onPress={() => router.push("/GuestHome")}
        >
          <Text style={styles.guestText}>Continue as Guest</Text>
        </TouchableOpacity>

        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  scrollContent: { padding: 20 },

  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },

  subtext: { fontSize: 14, color: "#666", marginBottom: 20 },

  tabContainer: { flexDirection: "row", marginBottom: 25 },

  tab: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 5,
  },

  activeTab: { backgroundColor: "#eaf8ef", borderColor: "#28a745" },

  tabText: { fontSize: 16, color: "#666" },

  activeTabText: { color: "#28a745", fontWeight: "bold" },

  label: { fontSize: 14, color: "#333", marginBottom: 5, marginTop: 10 },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#000",
    marginBottom: 10,
  },

  roleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },

  roleBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    alignItems: "center",
    padding: 15,
    marginHorizontal: 5,
  },

  activeRole: {
    borderColor: "#28a745",
    backgroundColor: "#eaf8ef",
  },

  roleImage: {
    width: 40,
    height: 40,
    marginBottom: 5,
    resizeMode: "contain",
  },

  roleText: { fontSize: 16, color: "#333" },

  activeRoleText: { color: "#28a745", fontWeight: "bold" },

  loginButton: {
    backgroundColor: "#28a745",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },

  loginText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },

  guestButton: { marginTop: 20 },

  guestText: {
    color: "#28a745",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});
