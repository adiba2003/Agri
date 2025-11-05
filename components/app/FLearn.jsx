import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

// ✅ All images imported at the top
import backArrow from "../assets/back-arrow.png";
import books from "../assets/books.png";
import rice from "../assets/rice.png";
import carrot from "../assets/carrot.png";
import calendarIcon from "../assets/calendar-icon.png";
import clock from "../assets/clock.png";
import waterIcon from "../assets/water-icon.png";
import homeIcon from "../assets/home-icon.png";
import productsIcon from "../assets/products-icon.png";
import weather from "../assets/weather.png";
import help from "../assets/help.png";
import orders from "../assets/orders.png";

export default function FLearn({ navigation }) {
  const [activeTab, setActiveTab] = useState("Articles");
  const [activeNav, setActiveNav] = useState("Home"); // Default Learn

  return (
    <View style={styles.container}>
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
        <View>
          <Text style={styles.appName}>AgriXpet</Text>
          <Text style={styles.subtitle}>Learning Center</Text>
        </View>
      </View>

      {/* Scrollable Part */}
      <ScrollView style={{ flex: 1 }}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Image source={books} style={styles.iconImage} />
          <View>
            <Text style={styles.title}>Learning Center</Text>
            <Text style={styles.subTitleText}>
              Educational blogs and video tutorials in English
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {["Articles", "Videos", "Soil Guide"].map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Articles List */}
        <View style={styles.articleContainer}>
          {/* Rice Cultivation */}
          <View style={styles.articleCard}>
            <Image source={rice} style={styles.articleImage} />
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>
                Modern Rice Cultivation Methods
              </Text>
              <Text style={styles.articleDesc}>
                Learn about scientific methods and care for high-yield rice
                cultivation in detail.
              </Text>
              <View style={styles.articleFooter}>
                <View style={styles.footerItem}>
                  <Image source={calendarIcon} style={styles.footerIcon} />
                  <Text style={styles.articleDate}>Dec 10, 2024</Text>
                </View>
                <View style={styles.footerItem}>
                  <Image source={clock} style={styles.footerIcon} />
                  <Text style={styles.articleTime}>5 min read</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Winter Vegetable Cultivation */}
          <View style={styles.articleCard}>
            <Image source={carrot} style={styles.articleImage} />
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>
                Winter Vegetable Cultivation
              </Text>
              <Text style={styles.articleDesc}>
                Skills and care for growing nutritious winter vegetables.
              </Text>
              <View style={styles.articleFooter}>
                <View style={styles.footerItem}>
                  <Image source={calendarIcon} style={styles.footerIcon} />
                  <Text style={styles.articleDate}>Dec 8, 2024</Text>
                </View>
                <View style={styles.footerItem}>
                  <Image source={clock} style={styles.footerIcon} />
                  <Text style={styles.articleTime}>7 min read</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Irrigation Management */}
          <View style={styles.articleCard}>
            <Image source={waterIcon} style={styles.articleImage} />
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>Irrigation Management</Text>
              <Text style={styles.articleDesc}>
                Efficient irrigation systems and the use of modern technology in
                water management.
              </Text>
              <View style={styles.articleFooter}>
                <View style={styles.footerItem}>
                  <Image source={calendarIcon} style={styles.footerIcon} />
                  <Text style={styles.articleDate}>Dec 5, 2024</Text>
                </View>
                <View style={styles.footerItem}>
                  <Image source={clock} style={styles.footerIcon} />
                  <Text style={styles.articleTime}>6 min read</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {[
          {
            name: "Home",
            image: homeIcon,
            route: "FarmerDashboard",
          },
          {
            name: "Products",
            image: productsIcon,
            route: "FarmerProducts",
          },
          {
            name: "Weather",
            image: weather,
            route: "Calendar",
          },
          {
            name: "Help",
            image: help,
            route: "Calendar",
          },
          {
            name: "Orders",
            image: orders,
            notification: 15,
            route: "FarmerOrders",
          },
        ].map((item, index) => {
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
  logoBox: {
    backgroundColor: "#28a745",
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  backButton: { marginRight: 10 },
  backIcon: { width: 24, height: 24, resizeMode: "contain" },
  logoText: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  appName: { fontSize: 18, fontWeight: "bold", color: "#000" },
  subtitle: { fontSize: 13, color: "#666" },

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
  articleContent: { flex: 1 },
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
  navIcon: { width: 22, height: 22, marginBottom: 4, resizeMode: "contain" },
  activeNavItem: { borderColor: "#28a745", backgroundColor: "#eaf8ea" },
  navText: { fontSize: 12, color: "#333", textAlign: "center" },
  activeNavText: { color: "#28a745", fontWeight: "bold" },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 4,
  },
  notificationText: { fontSize: 10, color: "#fff" },
});
