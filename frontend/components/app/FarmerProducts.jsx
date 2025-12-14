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
import notificationIconImg from "@/assets/notification.png";
import riceImg from "@/assets/rice.png";
import tomatoImg from "@/assets/tomato.png";
import potatoImg from "@/assets/potato.png";
import orderIcon from "@/assets/order.png";
import starIcon from "@/assets/star-icon.webp";
import homeIcon from "@/assets/home-icon.png";
import productsIcon from "@/assets/products-icon.png";
import weatherIcon from "@/assets/weather.png";
import helpIcon from "@/assets/help.png";
import ordersIcon from "@/assets/orders.png";

export default function FarmerProducts() {
  const [activeNav, setActiveNav] = useState("পণ্য");

  // Dummy products data
  const products = [
    {
      id: 1,
      name: "বাসমতি চাল",
      price: "$85/kg",
      stock: "500kg গ্রহণসাধ্য",
      orders: "25 অর্ডার",
      rating: "4.8 rating",
      status: "Active",
      icon: riceImg,
    },
    {
      id: 2,
      name: "টমেটো",
      price: "$60/kg",
      stock: "200kg গ্রহণসাধ্য",
      orders: "18 অর্ডার",
      rating: "4.7 rating",
      status: "Active",
      icon: tomatoImg,
    },
    {
      id: 3,
      name: "আলু",
      price: "$85/kg",
      stock: "300kg গ্রহণসাধ্য",
      orders: "12 অর্ডার",
      rating: "4.6 rating",
      status: "Active",
      icon: potatoImg,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Scrollable Product List */}
      <ScrollView style={styles.scrollArea}>
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>আমার পণ্য</Text>
            <Text style={styles.sectionSubtitle}>
              আপনার পণ্য তালিকা পরিচালনা করুন
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/NewProduct")}
          >
            <Text style={styles.addButtonText}>+ পণ্য যোগ করুন</Text>
          </TouchableOpacity>
        </View>

        {/* Products */}
        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={product.icon} style={styles.productImage} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDetails}>
                  {product.price} • {product.stock}
                </Text>
                <View style={styles.productStats}>
                  <View style={styles.statRow}>
                    <Image source={orderIcon} style={styles.statIcon} />
                    <Text style={styles.statText}>{product.orders}</Text>
                  </View>
                  <View style={styles.statRow}>
                    <Image source={starIcon} style={styles.statIcon} />
                    <Text style={styles.statText}>{product.rating}</Text>
                  </View>
                  <Text style={styles.activeStatus}>● {product.status}</Text>
                </View>
              </View>
            </View>

            {/* Actions: Edit (top) + Pause (below) */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.editBtn}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pauseBtn}>
                <Text style={styles.pauseText}>Pause</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Fixed Bottom Navigation */}
      <View style={styles.bottomNav}>
        {[
          { name: "হোম", image: homeIcon, route: "/FarmerDashboard" },
          { name: "পণ্য", image: productsIcon, route: "/FarmerProducts" },
          { name: "আবহাওয়া", image: weatherIcon, route: "/Calendar" },
          { name: "সহায়তা", image: helpIcon, route: "/FAi" },
          {
            name: "অর্ডার",
            image: ordersIcon,
            notification: 15,
            route: "/FarmerOrders",
          },
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
                {item.notification && (
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

// ✅ Styles remain the same (except action buttons area updated)
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
  backButton: { marginRight: 10 },
  backIcon: { width: 24, height: 24, resizeMode: "contain" },
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

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#000" },
  sectionSubtitle: { fontSize: 13, color: "#666" },
  addButton: {
    backgroundColor: "#28a745",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 13 },

  scrollArea: { flex: 1, padding: 15, marginBottom: 70 },

  productCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  productImage: { width: 40, height: 40, resizeMode: "contain" },
  productName: { fontSize: 15, fontWeight: "bold", color: "#000" },
  productDetails: { fontSize: 13, color: "#666" },

  productStats: { flexDirection: "row", marginTop: 5, alignItems: "center" },
  statRow: { flexDirection: "row", alignItems: "center", marginRight: 12 },
  statIcon: { width: 14, height: 14, resizeMode: "contain", marginRight: 4 },
  statText: { fontSize: 12, color: "#666" },
  activeStatus: { fontSize: 12, color: "green", fontWeight: "600" },

  // ⬇️ UPDATED: vertical buttons (Edit on top, Pause below)
  actionButtons: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  editBtn: {
    backgroundColor: "#e6f0ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 8, // space before Pause
  },
  editText: { color: "#007bff", fontWeight: "bold" },

  pauseBtn: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  pauseText: { color: "#555", fontWeight: "bold" },

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
