import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

// ✅ Import all images at the top
import backArrow from "@/assets/back-arrow.png";
import homeIcon from "@/assets/home-icon.png";
import productsIcon from "@/assets/products-icon.png";
import cartIcon from "@/assets/cart.png";
import ordersIcon from "@/assets/orders.png";
import notificationIcon from "@/assets/notification.png";
import booksIcon from "@/assets/books.png";
import leafIcon from "@/assets/leaf1.png";
import chemicalIcon from "@/assets/chemical.png";

export default function BuyerSoil() {
  const [activeTab, setActiveTab] = useState("Soil Guide");
  const [activeNav, setActiveNav] = useState("Home");

  const navItems = [
    { name: "Home", image: homeIcon, route: "BuyerDashboard" },
    { name: "Browse", image: productsIcon, route: "BuyerBrowse" },
    { name: "Cart", image: cartIcon, notification: 5, route: "Cart" },
    { name: "Orders", image: ordersIcon, route: "BuyerOrder" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Image source={booksIcon} style={styles.iconImage} />
          <View>
            <Text style={styles.title}>শিক্ষা কেন্দ্র</Text>
            <Text style={styles.subTitleText}>
              শিক্ষামূলক ব্লগ ও ভিডিও টিউটোরিয়াল 
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {[
            { name: "Articles", bn: "আর্টিকেল", route: "BuyerLearn" },
            { name: "Videos", bn: "ভিডিও", route: "BuyerVdo" },
            { name: "Soil Guide", bn: "মাটি নির্দেশিকা", route: "BuyerSoil" },
          ].map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, activeTab === tab.name && styles.activeTab]}
              onPress={() => {
                setActiveTab(tab.name);
                router.push(`/${tab.route}`);
              }}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.name && styles.activeTabText,
                ]}
              >
                {tab.bn}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Soil Types Title */}
        <Text style={styles.fertilizerTitle}>মাটির ধরন</Text>

        {/* Soil Types List */}
        {[
          {
            name: "দোঁআশ মাটি",
            description: "সবচেয়ে উর্বর, প্রায় সব ফসল চাষের জন্য উপযুক্ত",
            color: "#8FBC8F",
          },
          {
            name: "এঁটেল মাটি",
            description: "জল ধারণ ক্ষমতা বেশি, ধান চাষের জন্য আদর্শ",
            color: "#D2B48C",
          },
          {
            name: "বেলে মাটি",
            description: "নিষ্কাশন ভালো, সবজি চাষের জন্য উপযোগী",
            color: "#F4A460",
          },
        ].map((soil, index) => (
          <View key={index} style={styles.soilCard}>
            <View style={styles.soilHeader}>
              <View
                style={[
                  styles.soilImagePlaceholder,
                  { backgroundColor: soil.color },
                ]}
              />
              <View style={styles.soilTextContainer}>
                <Text style={styles.soilName}>{soil.name}</Text>
                <Text style={styles.soilDescription}>{soil.description}</Text>
              </View>
            </View>
            <View
              style={[styles.colorIndicator, { backgroundColor: soil.color }]}
            />
          </View>
        ))}

        {/* Fertilizer Section Title */}
        <Text style={styles.fertilizerTitle}>সারের ব্যবহার নির্দেশিকা</Text>

        <View style={styles.fertilizerSection}>
          {[
            {
              name: "জৈব সার",
              desc: "গোবর, কম্পোস্ট ইত্যাদি",
              image: leafIcon,
            },
            {
              name: "রাসায়নিক সার",
              desc: "ইউরিয়া, টিএসপি, এমপি",
              image: chemicalIcon,
            },
          ].map((fertilizer, index, arr) => (
            <View
              key={index}
              style={[
                styles.fertilizerItem,
                index === arr.length - 1 && {
                  borderBottomWidth: 0,
                  marginBottom: 0,
                  paddingBottom: 0,
                },
              ]}
            >
              <View style={styles.fertilizerHeader}>
                <View style={styles.fertilizerIcon}>
                  <Image
                    source={fertilizer.image}
                    style={{
                      width: 28,
                      height: 28,
                      resizeMode: "contain",
                    }}
                  />
                </View>
                <Text style={styles.fertilizerName}>{fertilizer.name}</Text>
              </View>

              <Text style={styles.fertilizerDescription}>
                {fertilizer.desc}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {navItems.map((item, index) => {
          const isActive = activeNav === item.name;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.navItem, isActive && styles.activeNavItem]}
              onPress={() => {
                setActiveNav(item.name);
                router.push(`/${item.route}`);
              }}
            >
              <View style={{ position: "relative" }}>
                <Image source={item.image} style={styles.navIcon} />
                {item.notification && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationText}>
                      {item.notification}
                    </Text>
                  </View>
                )}
              </View>

              <Text style={[styles.navText, isActive && styles.activeNavText]}>
                {item.name === "Home"
                  ? "হোম"
                  : item.name === "Browse"
                  ? "ব্রাউজ"
                  : item.name === "Cart"
                  ? "কার্ট"
                  : "অর্ডার"}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}


// Styles remain unchanged
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
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
  appName: { fontSize: 18, fontWeight: "bold", color: "#000" },
  subtitle: { fontSize: 13, color: "#666" },
  notificationIcon: { width: 28, height: 28, resizeMode: "contain" },
  headerNotificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  headerNotificationText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  titleSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  iconImage: { width: 30, height: 30, marginRight: 10 },
  title: { fontSize: 20, fontWeight: "bold", color: "#333" },
  subTitleText: { fontSize: 14, color: "#666" },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  tabText: { fontSize: 14, color: "#666" },
  activeTab: { backgroundColor: "#eaf8ea" },
  activeTabText: { color: "#28a745", fontWeight: "bold" },
  fertilizerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    marginTop: 10,
    paddingHorizontal: 15,
  },
  soilCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
    marginHorizontal: 15,
  },
  soilHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  soilImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  soilTextContainer: { flex: 1 },
  soilName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  soilDescription: { fontSize: 14, color: "#666", marginTop: 5 },
  colorIndicator: {
    height: 4,
    borderRadius: 2,
    marginTop: 5,
  },
  fertilizerSection: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
    marginHorizontal: 15,
  },
  fertilizerItem: {
    marginBottom: 15,
    paddingBottom: 12,
    borderBottomWidth: 5,
    borderBottomColor: "#e0e0e0",
  },
  fertilizerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  fertilizerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e3f2fd",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  fertilizerName: { fontSize: 16, fontWeight: "600", color: "#333" },
  fertilizerDescription: {
    fontSize: 14,
    color: "#666",
    marginLeft: 46,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  navIcon: {
    width: 22,
    height: 22,
    marginBottom: 4,
    resizeMode: "contain",
  },
  activeNavItem: { borderColor: "#28a745", backgroundColor: "#eaf8ea" },
  navText: { fontSize: 12, color: "#333", textAlign: "center" },
  activeNavText: { color: "#28a745", fontWeight: "bold" },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
});
