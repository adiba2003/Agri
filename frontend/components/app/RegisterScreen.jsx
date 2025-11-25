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
import { SafeAreaView } from "react-native-safe-area-context";

import cartIcon from "@/assets/cart.png";
import googleIcon from "@/assets/google.png";
import riceIcon from "@/assets/rice.png";

// ⬇ আপনার Server URL দিন
const API_URL = "http://localhost:5000/api/auth/register";

const RoleCard = ({ role, selectedRole, onPress, icon, title, desc, bgColor }) => {
  const isActive = role === selectedRole;
  return (
    <TouchableOpacity
      style={[styles.roleCard, isActive && styles.activeRoleCard]}
      onPress={onPress}
    >
      <View style={[styles.roleIconBox, bgColor && { backgroundColor: bgColor }]}>
        <Image source={icon} style={styles.roleIcon} resizeMode="contain" />
      </View>
      <View>
        <Text style={styles.roleTitle}>{title}</Text>
        <Text style={styles.roleDesc}>{desc}</Text>
      </View>
    </TouchableOpacity>
  );
};

const AppButton = ({ title, onPress, style, textStyle, icon }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    {icon && <Image source={icon} style={{ width: 20, height: 20, marginRight: 8 }} />}
    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

export default function RegisterScreen() {
  const [activeTab, setActiveTab] = useState("register");
  const [role, setRole] = useState(null);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = async () => {
    if (!role) return Alert.alert("Please select a role");

    if (!fullName || !email || !password || !confirm)
      return Alert.alert("All fields are required");

    if (password !== confirm)
      return Alert.alert("Passwords do not match");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) return Alert.alert("Error", data.message);

      Alert.alert("Success", "Account created");

      if (role === "buyer") router.push("/BuyerDashboard");
      else router.push("/FarmerDashboard");

    } catch (e) {
      Alert.alert("Network Error", "Could not connect to server");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.welcome}>Welcome</Text>
        <Text style={styles.subtext}>
          Sign in to your account or create a new one
        </Text>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "signin" && styles.activeTab]}
            onPress={() => {
              setActiveTab("signin");
              router.push("/login");
            }}
          >
            <Text style={[styles.tabText, activeTab === "signin" && styles.activeTabText]}>
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "register" && styles.activeTab]}
            onPress={() => setActiveTab("register")}
          >
            <Text style={[styles.tabText, activeTab === "register" && styles.activeTabText]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>

        {/* Role Selection */}
        <Text style={styles.roleLabel}>I am registering as:</Text>

        <RoleCard
          role="buyer"
          selectedRole={role}
          onPress={() => setRole("buyer")}
          icon={cartIcon}
          title="I am a Buyer"
          desc="I want to purchase fresh farm products"
        />

        <RoleCard
          role="farmer"
          selectedRole={role}
          onPress={() => setRole("farmer")}
          icon={riceIcon}
          bgColor="#eafce9"
          title="I am a Farmer"
          desc="I want to sell my farm products"
        />

        {/* Registration Form */}
        {role && (
          <View style={styles.formBox}>
            <TextInput placeholder="Full Name" value={fullName} onChangeText={setFullName} style={styles.input} />

            <TextInput
              placeholder="Email Address"
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              placeholder="Create Password"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              secureTextEntry
              value={confirm}
              onChangeText={setConfirm}
            />

            <View style={styles.orRow}>
              <View style={styles.line} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.line} />
            </View>

            <AppButton
              title="Continue with Google"
              style={styles.googleBtn}
              textStyle={styles.googleBtnText}
              icon={googleIcon}
            />

            <AppButton
              title="Create Account"
              style={styles.createBtn}
              onPress={handleRegister}
            />
          </View>
        )}

        <TouchableOpacity
          onPress={() => router.push("/GuestHome")}
          style={styles.guestTouchable}
        >
          <Text style={styles.guestText}>Continue as Guest</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // 🔹 Welcome ke ektu niche nite paddingTop 25
  scrollContent: {
    paddingBottom: 40,
    paddingTop: 25,
  },

  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 20,
    marginBottom: 4,
  },
  subtext: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    marginLeft: 20,
  },

  tabContainer: {
    flexDirection: "row",
    marginBottom: 25,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 3,
    marginHorizontal: 20,
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: "center", borderRadius: 10 },
  activeTab: { backgroundColor: "#fff", elevation: 2 },
  tabText: { fontSize: 16, color: "#666" },
  activeTabText: { color: "#28a745", fontWeight: "bold" },

  roleLabel: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 12,
    marginLeft: 20,
  },
  roleCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    marginHorizontal: 20,
  },
  activeRoleCard: { borderColor: "#28a745", backgroundColor: "#f6fef7" },
  roleIconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#f0f4ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  roleIcon: { width: 30, height: 30 },
  roleTitle: { fontSize: 16, fontWeight: "600", color: "#000" },
  roleDesc: { fontSize: 13, color: "#666", marginTop: 3 },

  formBox: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    backgroundColor: "#f9f9f9",
  },
  orRow: { flexDirection: "row", alignItems: "center", marginVertical: 12 },
  line: { flex: 1, height: 1, backgroundColor: "#ddd" },
  orText: { color: "#666", marginHorizontal: 8 },

  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  googleBtnText: { fontWeight: "600", color: "#444" },

  button: {
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  createBtn: { backgroundColor: "#28a745" },

  // 🔹 Text-only guest "button"
  guestTouchable: {
    marginTop: 20,
    alignSelf: "center",
  },
  guestText: {
    color: "#28a745",
    fontSize: 16,
    fontWeight: "600",
  },
});
