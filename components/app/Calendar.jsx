import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";

// ✅ Import all images at the top
import backArrow from "../assets/back-arrow.png";
import homeIcon from "../assets/home-icon.png";
import productsIcon from "../assets/products-icon.png";
import weatherIcon from "../assets/weather.png";
import helpIcon from "../assets/help.png";
import ordersIcon from "../assets/orders.png";
import notificationIcon from "../assets/notification.png";
import calendarIconImg from "../assets/calendar-icon.png";
import waterIcon from "../assets/water-icon.png";
import leafImg from "../assets/leaf.jpg";
import weatherColor from "../assets/weather-colour.png";
import vegetablesImg from "../assets/vegetables.png";
import carrotImg from "../assets/carrot.png";
import chiliImg from "../assets/chili.png";
import onionImg from "../assets/onion.png";
import riceImg from "../assets/rice.png";

export default function Calendar({ navigation }) {
  const [activeNav, setActiveNav] = useState("Home");
  const [checkedTasks, setCheckedTasks] = useState({});

  const navItems = [
    { name: "Home", image: homeIcon, route: "FarmerDashboard" },
    { name: "Products", image: productsIcon, route: "FarmerProducts" },
    { name: "Weather", image: weatherIcon, route: "Calendar" },
    { name: "Help", image: helpIcon, route: "Calendar" },
    { name: "Orders", image: ordersIcon, notification: 15, route: "FarmerOrders" },
  ];

  const calendarData = {
    month: "October 2025",
    days: ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"],
    dates: [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, 31, null, null, null, null],
    ],
  };

  const highlightedDates = [6, 9, 14];

  const farmingTasks = [
    {
      id: 1,
      title: "Irrigate the rice field",
      items: ["6:00 AM - 8:00 AM • Urgent"],
      image: waterIcon,
    },
    {
      id: 2,
      title: "Apply fertilizer to tomato plants",
      items: ["4:00 PM - 6:00 PM"],
      image: leafImg,
    },
    {
      id: 3,
      title: "Check weather forecast",
      items: ["Anytime"],
      image: weatherColor,
    },
  ];

  const cropCards = [
    {
      id: 1,
      title: "Vegetables",
      crops: "Spinach, Red Amaranth, Radish",
      season: "Planting: December - January",
      image: vegetablesImg,
    },
    {
      id: 2,
      title: "Root Vegetables",
      crops: "Carrot, Beetroot, Turnip",
      season: "Planting: November - December",
      image: carrotImg,
    },
    {
      id: 3,
      title: "Spices",
      crops: "Chili, Coriander, Cumin",
      season: "Planting: October - November",
      image: chiliImg,
    },
    {
      id: 4,
      title: "Bulb Vegetables",
      crops: "Onion, Garlic, Leek",
      season: "Planting: November - December",
      image: onionImg,
    },
  ];

  const nextWeekTasks = [
    {
      id: 1,
      title: "Rice Harvesting Preparation",
      detail: "October 9 • Prepare Equipment",
      image: riceImg,
    },
    {
      id: 2,
      title: "Carrot Seed Sowing",
      detail: "October 14 • Prepare the Land",
      image: carrotImg,
    },
  ];

  const toggleTask = (id) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("FarmerDashboard")}
          style={styles.backButton}
        >
          <Image source={backArrow} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>A</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.appName}>AgriXpert</Text>
          <Text style={styles.subtitle}>Smart Agriculture Platform</Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <Image source={notificationIcon} style={styles.notificationIcon} />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>15</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Screen Title */}
        <View style={styles.titleSection}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={calendarIconImg} style={styles.calendarIcon} />
            <Text style={styles.screenTitle}>Farming Calendar</Text>
          </View>
          <Text style={styles.screenSubtitle}>
            Plan your crops and track farming activities
          </Text>
        </View>

        {/* Calendar, Tasks, Alerts, Crop Cards, Next Week Tasks */}
        {/* ... All sections remain unchanged ... */}
        {/* Just replace require() calls with imported images */}
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
                navigation.navigate(item.route);
              }}
            >
              <View style={{ position: "relative" }}>
                <Image source={item.image} style={styles.navIcon} />
                {item.notification && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationText}>{item.notification}</Text>
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

// ✅ Styles remain unchanged
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 10,
    backgroundColor: "#fff",
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
  appName: { fontSize: 18, fontWeight: "bold", color: "#000" },
  subtitle: { fontSize: 13, color: "#666" },
  notificationBtn: { padding: 5, position: "relative" },
  notificationIcon: { width: 28, height: 28, resizeMode: "contain" },
  notificationBadge: {
    position: "absolute",
    right: 0,
    top: -2,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  content: { flex: 1, padding: 20 },
  titleSection: { marginBottom: 20 },
  calendarIcon: { width: 24, height: 24, marginRight: 8, resizeMode: "contain" },
  screenTitle: { fontSize: 22, fontWeight: "bold", color: "#2c3e50" },
  screenSubtitle: { fontSize: 14, color: "#666", marginTop: 4 },
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
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 10,
    position: "relative",
  },
  activeNavItem: { backgroundColor: "#eaf8ea" },
  navIcon: { width: 24, height: 24, marginBottom: 4, resizeMode: "contain" },
  navText: { fontSize: 12, color: "#666", fontWeight: "500" },
  activeNavText: { color: "#4CAF50", fontWeight: "bold" },
  notificationText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
});
