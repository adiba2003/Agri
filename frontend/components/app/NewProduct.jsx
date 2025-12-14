import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { router } from "expo-router";

// ✅ Top-level image imports
import backArrow from "@/assets/back-arrow.png";
import notificationIcon from "@/assets/notification.png";
import cameraIcon from "@/assets/camera.png";
import homeIcon from "@/assets/home-icon.png";
import productsIcon from "@/assets/products-icon.png";
import weatherIcon from "@/assets/weather.png";
import helpIcon from "@/assets/help.png";
import ordersIcon from "@/assets/orders.png";

export default function NewProduct() {
  const [activeNav, setActiveNav] = useState("Products");

  const bottomNavItems = [
    { name: "হোম", img: homeIcon, route: "/FarmerDashboard" },
    { name: "পণ্য", img: productsIcon, route: "/FarmerProducts" },
    { name: "আবহাওয়া", img: weatherIcon, route: "/Calendar" },
    { name: "সহায়তা", img: helpIcon, route: "/Calendar" },
    { name: "অর্ডার", img: ordersIcon, route: "/FarmerOrders", notification: 15 },
  ];

  return (
    <View style={styles.container}>

      {/* Scrollable Form */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text style={styles.sectionTitle}>নতুন পণ্য যোগ করুন</Text>
        <Text style={styles.sectionSubtitle}>
          আপনার ফার্ম পণ্য বিক্রয়ের জন্য তালিকাভুক্ত করুন
        </Text>

        <Text style={styles.label}>পণ্যের নাম</Text>
        <TextInput
          style={styles.input}
          placeholder="যেমন: বাসমতি চাল"
        />

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={styles.label}>শ্রেণি</Text>
            <TextInput style={styles.input} placeholder="শ্রেণি নির্বাচন করুন" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>দর প্রতি কেজি (৳)</Text>
            <TextInput
              style={styles.input}
              placeholder="৮৫"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={styles.label}>উপলব্ধ পরিমাণ (কেজি)</Text>
            <TextInput
              style={styles.input}
              placeholder="৫০০"
              keyboardType="numeric"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>অবস্থান</Text>
            <TextInput style={styles.input} placeholder="অবস্থান নির্বাচন করুন" />
          </View>
        </View>

        <Text style={styles.label}>বর্ণনা</Text>
        <TextInput
          style={[styles.input, { height: 80, textAlignVertical: "top" }]}
          placeholder="পণ্যের মান, চাষের পদ্ধতি ইত্যাদি বর্ণনা করুন"
          multiline
        />

        <Text style={styles.label}>পণ্যের ছবি</Text>
        <TouchableOpacity style={styles.imageUpload}>
          <Image
            source={cameraIcon}
            style={{ width: 30, height: 30, marginBottom: 5 }}
          />
          <Text style={{ color: "#666", fontSize: 12 }}>
            পণ্যের ছবি আপলোড করতে ক্লিক করুন
          </Text>
          <Text style={{ color: "#aaa", fontSize: 11 }}>
            JPG, PNG ৫MB পর্যন্ত
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>পণ্য তালিকাভুক্ত করুন</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {bottomNavItems.map((item, index) => {
          const isActive = item.name === activeNav;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.navItem, isActive && styles.activeNavItem]}
              onPress={() => {
                setActiveNav(item.name);
                router.push(item.route);
              }}
            >
              <Image source={item.img} style={styles.navIcon} />
              <Text style={[styles.navText, isActive && styles.activeNavText]}>
                {item.name}
              </Text>
              {item.notification && (
                <View style={styles.navBadge}>
                  <Text style={styles.badgeText}>{item.notification}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },

  header: {
    backgroundColor: "#fff",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
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
  backButton: { marginRight: 10 },
  backIcon: { width: 24, height: 24, resizeMode: "contain" },
  appName: { fontSize: 16, fontWeight: "bold", color: "#000" },
  subtitle: { fontSize: 12, color: "#666" },
  notificationIcon: { width: 28, height: 28, resizeMode: "contain" },
  headerNotificationBadge: {
    position: "absolute",
    right: -2,
    top: -4,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  headerNotificationText: { color: "#fff", fontSize: 10, fontWeight: "bold" },

  scrollArea: { flex: 1, padding: 15 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
  },
  sectionSubtitle: { fontSize: 13, color: "#666", marginBottom: 15 },

  label: { fontSize: 14, fontWeight: "600", marginBottom: 5, color: "#333" },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
    fontSize: 13,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },

  imageUpload: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 20,
  },

  submitButton: {
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  submitButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 5,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    marginHorizontal: 3,
    borderRadius: 10,
    position: "relative",
  },
  activeNavItem: { backgroundColor: "#eaf8ea" },
  navIcon: { width: 24, height: 24, marginBottom: 3, resizeMode: "contain" },
  navText: { fontSize: 12, color: "#666", fontWeight: "500" },
  activeNavText: { color: "#4CAF50", fontWeight: "bold" },
  navBadge: {
    position: "absolute",
    top: 2,
    right: 18,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 4,
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
});
