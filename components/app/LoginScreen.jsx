import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// ✅ Top-level image imports
import backArrow from "@/assets/back-arrow.png";
import cartIcon from "@/assets/cart.png";
import riceIcon from "@/assets/rice.png";
import { router } from "expo-router";

export default function LoginScreen() {
    const [activeTab, setActiveTab] = useState("signin");
    const [role, setRole] = useState(null);

    const tabs = [
        { name: "Sign In", key: "signin" },
        { name: "Register", key: "register", route: "Register" },
    ];

    const roles = [
        { name: "Buyer", key: "buyer", image: cartIcon, route: "BuyerDashboard" },
        { name: "Farmer", key: "farmer", image: riceIcon, route: "FarmerDashboard" },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* <TouchableOpacity
                    // onPress={router.push("/")}
                    style={styles.backButton}
                >
                    <Image source={backArrow} style={styles.backIcon} />
                </TouchableOpacity> */}
                <View style={styles.logoBox}>
                    <Text style={styles.logoText}>A</Text>
                </View>
                <View>
                    <Text style={styles.appName}>AgriXpert</Text>
                    <Text style={styles.subtitle}>Smart Agriculture Platform</Text>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.welcome}>Welcome</Text>
                <Text style={styles.subtext}>
                    Sign in to your account or create a new one
                </Text>

                {/* Tabs */}
                <View style={styles.tabContainer}>
                    {tabs.map((tab, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
                            onPress={() => {
                                setActiveTab(tab.key);
                                if (tab.route) {
                                    router.push('/register');
                                }
                            }}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === tab.key && styles.activeTabText,
                                ]}
                            >
                                {tab.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Email & Password */}
                <Text style={styles.label}>Email or Phone</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email or phone number"
                    placeholderTextColor="#aaa"
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                />

                {/* Roles */}
                <Text style={styles.label}>Sign in as:</Text>
                <View style={styles.roleRow}>
                    {roles.map((r, index) => {
                        const isActive = role === r.key;
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[styles.roleBox, isActive && styles.activeRole]}
                            // onPress={() => {
                            //   setRole(r.key);
                            //   navigation.navigate(r.route);
                            // }}
                            >
                                <Image source={r.image} style={styles.roleImage} />
                                <Text style={[styles.roleText, isActive && styles.activeRoleText]}>
                                    {r.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Guest Button */}
                <TouchableOpacity
                    style={styles.guestButton}
                //onPress={() => navigation.navigate("GuestHome")}
                >
                    <Text style={styles.guestText}>Continue as Guest</Text>
                </TouchableOpacity>

                <View style={styles.extraSpace} />
            </ScrollView >
        </View >
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        paddingTop: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    backButton: { marginRight: 10 },
    backIcon: { width: 24, height: 24, resizeMode: "contain" },
    logoBox: {
        backgroundColor: "#28a745",
        width: 50,
        height: 50,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    logoText: { color: "#fff", fontSize: 22, fontWeight: "bold" },
    appName: { fontSize: 20, fontWeight: "bold", color: "#000" },
    subtitle: { fontSize: 14, color: "#555" },
    scrollContent: { padding: 20 },
    welcome: { fontSize: 24, fontWeight: "bold", color: "#000", marginBottom: 10 },
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
    roleRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 20 },
    roleBox: { flex: 1, borderWidth: 1, borderColor: "#ddd", borderRadius: 12, alignItems: "center", padding: 15, marginHorizontal: 5 },
    activeRole: { borderColor: "#28a745", backgroundColor: "#eaf8ef" },
    roleImage: { width: 40, height: 40, marginBottom: 5, resizeMode: "contain" },
    roleText: { fontSize: 16, color: "#333" },
    activeRoleText: { color: "#28a745", fontWeight: "bold" },
    guestButton: { marginTop: 20 },
    guestText: { color: "#28a745", fontSize: 16, textAlign: "center", fontWeight: "600" },
    extraSpace: { height: 50 },
});
