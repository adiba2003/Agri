import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

// ✅ সব image import উপরে
import backArrow from "../assets/back-arrow.png";
import homeIcon from "../assets/home-icon.png";
import productsIcon from "../assets/products-icon.png";
import cartIcon from "../assets/cart.png";
import ordersIcon from "../assets/orders.png";
import notificationIcon from "../assets/notification.png";
import booksIcon from "../assets/books.png";
import riceImg from "../assets/rice.png";
import carrotImg from "../assets/carrot.png";
import waterIcon from "../assets/water-icon.png";
import calendarIcon from "../assets/calendar-icon.png";
import clockIcon from "../assets/clock.png";

export default function BuyerLearn({ navigation }) {
  const [activeTab, setActiveTab] = useState("Articles");
  const [activeNav, setActiveNav] = useState("Home");

  const navItems = [
    { name: "Home", image: homeIcon, route: "BuyerDashboard" },
    { name: "Browse", image: productsIcon, route: "BuyerBrowse" },
    { name: "Cart", image: cartIcon, notification: 5, route: "Cart" },
    { name: "Orders", image: ordersIcon, route: "BuyerOrder" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("BuyerDashboard")}
          style={styles.backButton}
        >
          <Image source={backArrow} style={styles.backIcon} />
        </TouchableOpacity>

        <View style={styles.logoBox}>
          <Text style={styles.logoText}>A</Text>
        </View>

        <View>
          <Text style={styles.appName}>AgriXpert</Text>
          <Text style={styles.subtitle}>Learning Center</Text>
        </View>

        <View style={{ position: "relative", marginLeft: 10 }}>
          <Image source={notificationIcon} style={styles.notificationIcon} />
          <View style={styles.headerNotificationBadge}>
            <Text style={styles.headerNotificationText}>2</Text>
          </View>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={{ flex: 1 }}>
        {/* Title */}
        <View style={styles.titleSection}>
          <Image source={booksIcon} style={styles.iconImage} />
          <View>
            <Text style={styles.title}>Learning Center</Text>
            <Text style={styles.subTitleText}>
              Educational blogs and video tutorials in English
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {[
            { name: "Articles", route: "BuyerLearn" },
            { name: "Videos", route: "BuyerVdo" },
            { name: "Soil Guide", route: "BuyerSoil" },
          ].map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, activeTab === tab.name && styles.activeTab]}
              onPress={() => {
                setActiveTab(tab.name);
                navigation.navigate(tab.route);
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

        {/* Articles */}
        <View style={styles.articleContainer}>
          {[
            {
              title: "Modern Rice Cultivation Methods",
              desc: "Learn about scientific methods and care for high-yield rice cultivation.",
              img: riceImg,
              date: "Dec 10, 2024",
              time: "5 min read",
            },
            {
              title: "Winter Vegetable Cultivation",
              desc: "Skills and care for growing nutritious winter vegetables.",
              img: carrotImg,
              date: "Dec 8, 2024",
              time: "7 min read",
            },
            {
              title: "Irrigation Management",
              desc: "Efficient irrigation systems and use of modern technology.",
              img: waterIcon,
              date: "Dec 5, 2024",
              time: "6 min read",
            },
          ].map((article, index) => (
            <View key={index} style={styles.articleCard}>
              <Image source={article.img} style={styles.articleImage} />
              <View style={styles.articleContent}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleDesc}>{article.desc}</Text>
                <View style={styles.articleFooter}>
                  <View style={styles.footerItem}>
                    <Image source={calendarIcon} style={styles.footerIcon} />
                    <Text style={styles.articleDate}>{article.date}</Text>
                  </View>
                  <View style={styles.footerItem}>
                    <Image source={clockIcon} style={styles.footerIcon} />
                    <Text style={styles.articleTime}>{article.time}</Text>
                  </View>
                </View>
              </View>
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
                navigation.navigate(item.route);
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
              <Text
                style={[styles.navText, isActive && styles.activeNavText]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// 🔽 styles আগের মতোই রাখো
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: { marginRight: 10 },
  backIcon: { width: 24, height: 24 },
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
  notificationIcon: { width: 28, height: 28 },
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
  headerNotificationText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  titleSection: { flexDirection: "row", alignItems: "center", padding: 15 },
  iconImage: { width: 30, height: 30, marginRight: 10 },
  title: { fontSize: 20, fontWeight: "bold", color: "#333" },
  subTitleText: { fontSize: 14, color: "#666" },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center" },
  tabText: { fontSize: 14, color: "#666" },
  activeTab: { backgroundColor: "#eaf8ea" },
  activeTabText: { color: "#28a745", fontWeight: "bold" },
  articleContainer: { padding: 15 },
  articleCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
    alignItems: "center",
  },
  articleImage: { width: 50, height: 50, borderRadius: 10, marginRight: 12 },
  articleTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  articleDesc: { fontSize: 14, color: "#555", marginTop: 5 },
  articleFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  footerItem: { flexDirection: "row", alignItems: "center" },
  footerIcon: { width: 16, height: 16, marginRight: 5 },
  articleDate: { fontSize: 12, color: "#777" },
  articleTime: { fontSize: 12, color: "#777" },
  bottomNav: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 10,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navIcon: { width: 22, height: 22, marginBottom: 4 },
  activeNavItem: { backgroundColor: "#eaf8ea" },
  navText: { fontSize: 12, color: "#333" },
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
