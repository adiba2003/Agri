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
import booksIcon from "@/assets/books.png";
import leafIcon from "@/assets/leaf1.png";
import chemicalIcon from "@/assets/chemical.png";

import homeIcon from "@/assets/home-icon.png";
import productsIcon from "@/assets/products-icon.png";
import weather from "@/assets/weather.png";
import help from "@/assets/help.png";
import orders from "@/assets/orders.png";

export default function Fsoil() {
  const [activeTab, setActiveTab] = useState("Soil Guide");
  const [activeNav, setActiveNav] = useState("Home");

  return (
    <View style={styles.container}>

      {/* Scrollable Content */}
      <ScrollView style={{ flex: 1 }}>
        
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Image source={booksIcon} style={styles.iconImage} />
          <View>
            <Text style={styles.title}>Learning Center</Text>
            <Text style={styles.subTitleText}>
              Educational blogs and video tutorials in English
            </Text>
          </View>
        </View>

        {/* 🔥 Tabs with Navigation */}
        <View style={styles.tabContainer}>
          {[
            { name: "Articles", route: "/FLearn" },
            { name: "Videos", route: "/Fvdo" },
            { name: "Soil Guide", route: "/Fsoil" },
          ].map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, activeTab === tab.name && styles.activeTab]}
              onPress={() => {
                setActiveTab(tab.name);
                router.push(tab.route);
              }}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.name && styles.activeTabText,
                ]}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.fertilizerTitle}>Types of Soil</Text>

        {/* Soil Types */}
        {[
          {
            name: "Loamy Soil",
            description: "Most fertile, suitable for all types of crops",
            color: "#8FBC8F",
          },
          {
            name: "Clay Soil",
            description: "Good water retention, ideal for rice cultivation",
            color: "#D2B48C",
          },
          {
            name: "Sandy Soil",
            description: "Good drainage, suitable for vegetables",
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

        {/* Fertilizer Section */}
        <Text style={styles.fertilizerTitle}>Fertilizer Usage Guide</Text>
        <View style={styles.fertilizerSection}>
          {[
            {
              name: "Organic Fertilizer",
              desc: "Animal dung, Compost",
              image: leafIcon,
            },
            {
              name: "Chemical Fertilizer",
              desc: "Urea, TSP, MP",
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

      {/* 🔻 Bottom Navigation (Updated like Fvdo) */}
      <View style={styles.bottomNav}>
        {[
          { name: "Home", image: homeIcon, route: "/FarmerDashboard" },
          { name: "Products", image: productsIcon, route: "/FarmerProducts" },
          { name: "Weather", image: weather, route: "/Calendar" },
          { name: "Help", image: help, route: "/Calendar" },
          { name: "Orders", image: orders, notification: 15, route: "/FarmerOrders" },
        ].map((item, index) => {
          const isActive = activeNav === item.name;

          return (
            <TouchableOpacity
              key={index}
              style={[styles.navItem, isActive && styles.activeNavItem]}
              onPress={() => {
                setActiveNav(item.name);
                router.push(item.route);
              }}
            >
              <View style={{ position: "relative" }}>
                <Image source={item.image} style={styles.navIcon} />

                {/* Orders Notification Bubble */}
                {item.notification && item.name === "Orders" && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationText}>
                      {item.notification}
                    </Text>
                  </View>
                )}
              </View>

              <Text style={[styles.navText, isActive && styles.activeNavText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

/* ================================
   🔥 Styles
================================ */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

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

  /* Navigation Styles */
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
  activeNavItem: {
    backgroundColor: "#eaf8ea",
    borderColor: "#28a745",
  },
  navIcon: {
    width: 22,
    height: 22,
    marginBottom: 4,
    resizeMode: "contain",
  },
  navText: { fontSize: 12, color: "#333" },
  activeNavText: { color: "#28a745", fontWeight: "bold" },

  notificationBadge: {
    position: "absolute",
    top: -6,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 4,
    minWidth: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationText: { fontSize: 10, color: "#fff", fontWeight: "bold" },
});

