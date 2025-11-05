import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";

// ✅ Top-level image imports
import backArrow from "../assets/back-arrow.png";
import booksIcon from "../assets/books.png";
import waterPump from "../assets/water-pump.jpg";
import calendarIcon from "../assets/calendar-icon.png";
import clockIcon from "../assets/clock.png";
import homeIcon from "../assets/home-icon.png";
import productsIcon from "../assets/products-icon.png";
import learnIcon from "../assets/learn-icon.webp";
import chatIcon from "../assets/chat-icon.png";

export default function LearnVdo({ navigation }) {
  const [activeTab, setActiveTab] = useState("Videos");
  const [activeNav, setActiveNav] = useState("Learn");

  const tabs = [
    { name: "Articles", route: "LearnArti" },
    { name: "Videos", route: "LearnVdo" },
    { name: "Soil Guide", route: "LearnSoil" },
  ];

  const videos = [
    {
      title: "Proper Rice Transplanting Method",
      desc: "Video Tutorial: How to Transplant Rice Properly.",
      date: "Dec 12, 2024",
      time: "15 min",
      image: waterPump,
    },
    {
      title: "Organic Pesticide Preparation",
      desc: "Method of Making Organic Pesticide with Household Ingredients.",
      date: "Dec 9, 2024",
      time: "12 min",
      image: waterPump,
    },
  ];

  const bottomNavItems = [
    { name: "Home", image: homeIcon, route: "GuestHome" },
    { name: "Products", image: productsIcon, route: "browse" },
    { name: "Learn", image: learnIcon, route: "LearnVdo" },
    { name: "AI Chat", image: chatIcon, route: "Ai" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("GuestHome")} style={styles.backButton}>
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

      {/* Scrollable Content */}
      <ScrollView style={{ flex: 1 }}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Image source={booksIcon} style={styles.iconImage} />
          <View>
            <Text style={styles.title}>Learning Center</Text>
            <Text style={styles.subTitleText}>Educational blogs and video tutorials in English</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, activeTab === tab.name && styles.activeTab]}
              onPress={() => {
                setActiveTab(tab.name);
                navigation.navigate(tab.route);
              }}
            >
              <Text style={[styles.tabText, activeTab === tab.name && styles.activeTabText]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Video Cards */}
        <View style={styles.articleContainer}>
          {videos.map((video, index) => (
            <View key={index} style={styles.articleCard}>
              <Image source={video.image} style={styles.articleImage} />
              <View style={styles.articleContent}>
                <Text style={styles.articleTitle}>{video.title}</Text>
                <Text style={styles.articleDesc}>{video.desc}</Text>
                <View style={styles.articleFooter}>
                  <View style={styles.footerItem}>
                    <Image source={calendarIcon} style={styles.footerIcon} />
                    <Text style={styles.articleDate}>{video.date}</Text>
                  </View>
                  <View style={styles.footerItem}>
                    <Image source={clockIcon} style={styles.footerIcon} />
                    <Text style={styles.articleTime}>{video.time}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {bottomNavItems.map((item, index) => {
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
              <Image source={item.image} style={styles.navIcon} />
              <Text style={[styles.navText, isActive && styles.activeNavText]}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", padding: 15, borderBottomWidth: 1, borderBottomColor: "#eee", backgroundColor: "#fff" },
  backButton: { marginRight: 10 },
  backIcon: { width: 24, height: 24, resizeMode: "contain" },
  logoBox: { backgroundColor: "#28a745", width: 50, height: 50, borderRadius: 12, alignItems: "center", justifyContent: "center", marginRight: 12 },
  logoText: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  appName: { fontSize: 18, fontWeight: "bold", color: "#000" },
  subtitle: { fontSize: 13, color: "#666" },

  titleSection: { flexDirection: "row", alignItems: "center", padding: 15 },
  iconImage: { width: 30, height: 30, marginRight: 10 },
  title: { fontSize: 20, fontWeight: "bold", color: "#333" },
  subTitleText: { fontSize: 14, color: "#666" },

  tabContainer: { flexDirection: "row", justifyContent: "space-around", marginHorizontal: 10, marginVertical: 10, backgroundColor: "#f5f5f5", borderRadius: 10 },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 10 },
  tabText: { fontSize: 14, color: "#666" },
  activeTab: { backgroundColor: "#eaf8ea" },
  activeTabText: { color: "#28a745", fontWeight: "bold" },

  articleContainer: { padding: 15 },
  articleCard: { flexDirection: "row", backgroundColor: "#f9f9f9", borderRadius: 12, padding: 12, marginBottom: 15, borderLeftWidth: 4, borderLeftColor: "#4CAF50", alignItems: "center" },
  articleImage: { width: 50, height: 50, borderRadius: 10, marginRight: 12 },
  articleContent: { flex: 1 },
  articleTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  articleDesc: { fontSize: 14, color: "#555", marginTop: 5 },
  articleFooter: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  footerItem: { flexDirection: "row", alignItems: "center" },
  footerIcon: { width: 16, height: 16, marginRight: 5 },
  articleDate: { fontSize: 12, color: "#777" },
  articleTime: { fontSize: 12, color: "#777" },

  bottomNav: { flexDirection: "row", backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#ddd", paddingVertical: 10, paddingHorizontal: 5 },
  navItem: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 6, marginHorizontal: 5, borderWidth: 1, borderColor: "#ccc", borderRadius: 12, backgroundColor: "#fff" },
  navIcon: { width: 22, height: 22, marginBottom: 4, resizeMode: "contain" },
  activeNavItem: { borderColor: "#28a745", backgroundColor: "#eaf8ea" },
  navText: { fontSize: 12, color: "#333", textAlign: "center" },
  activeNavText: { color: "#28a745", fontWeight: "bold" },
});
