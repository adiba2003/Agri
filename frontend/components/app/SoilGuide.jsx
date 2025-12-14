import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { router } from "expo-router";

// ✅ Top-level image imports
import backArrow from "@/assets/back-arrow.png";
import homeIcon from "@/assets/home-icon.png";
import productsIcon from "@/assets/products-icon.png";
import learnIcon from "@/assets/learn-icon.webp";
import chatIcon from "@/assets/chat-icon.png";
import leafImage from "@/assets/leaf.jpg";
import leaf1 from "@/assets/leaf1.png";
import chemicalIcon from "@/assets/chemical.png";
import searchIcon from "@/assets/search-icon.png";
import calendarIcon from "@/assets/calendar-icon.png";
import waterIcon from "@/assets/water-icon.png";

export default function SoilGuide() {
  const [activeTab, setActiveTab] = useState("Home"); // ডিফল্ট হোম

  const tabs = [
    { name: "হোম", img: homeIcon, route: "/GuestHome" },
    { name: "পণ্য", img: productsIcon, route: "/browse" },
    { name: "শেখা", img: learnIcon, route: "/LearnArti" },
    { name: "এআই চ্যাট", img: chatIcon, route: "/Ai" },
  ];

  const soilTypes = [
    {
      name: "দোঁআশ মাটি",
      description: "সবচেয়ে উর্বর, সব ধরনের ফসলের জন্য উপযুক্ত",
      color: "#8FBC8F",
    },
    {
      name: "এঁটেল মাটি",
      description: "ভাল পানি ধারণ ক্ষমতা, ধান চাষের জন্য আদর্শ",
      color: "#D2B48C",
    },
    {
      name: "বেলে মাটি",
      description: "ভাল নিষ্কাশন ক্ষমতা, শাকসবজির জন্য উপযুক্ত",
      color: "#F4A460",
    },
  ];

  const fertilizers = [
    { name: "জৈব সার", desc: "পশুর গোবর, কম্পোস্ট", image: leaf1 },
    { name: "রাসায়নিক সার", desc: "ইউরিয়া, TSP, MP", image: chemicalIcon },
  ];

  const cropManagement = [
    {
      title: "মাটির পরীক্ষা",
      description: "সম্পূর্ণ মাটি বিশ্লেষণ এবং সুপারিশ",
      image: searchIcon,
    },
    {
      title: "পুষ্টি ব্যবস্থাপনা",
      description: "বিভিন্ন ফসলের জন্য উপযুক্ত পুষ্টির ভারসাম্য",
      image: leafImage,
    },
    {
      title: "মৌসুম পরিকল্পনা",
      description: "সেরা চাষের সময় এবং ফসলের ঘূর্ণন",
      image: calendarIcon,
    },
    {
      title: "জল ব্যবস্থাপনা",
      description: "দক্ষ সেচ এবং জল সংরক্ষণ",
      image: waterIcon,
    },
  ];

  return (
    <View style={styles.container}>

      <ScrollView style={styles.content}>
        {/* মাটি ও সার বিভাগ */}
        <View style={styles.sectionHeader}>
          <Image source={leafImage} style={styles.leafIcon} />
          <Text style={styles.sectionTitle}>মাটির প্রকার ও সার ব্যবস্থাপনা</Text>
        </View>

        <Text style={styles.sectionDescription}>
          মাটির স্বাস্থ্য এবং সার ব্যবস্থাপনা সম্পর্কে জানুন
        </Text>

        {/* মাটির প্রকার */}
        <Text style={styles.fertilizerTitle}>মাটির প্রকার</Text>
        {soilTypes.map((soil, index) => (
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

        {/* সার ব্যবহার নির্দেশিকা */}
        <Text style={styles.fertilizerTitle}>সার ব্যবহারের নির্দেশিকা</Text>
        <View style={styles.fertilizerSection}>
          {fertilizers.map((fertilizer, index, arr) => (
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
                    style={{ width: 28, height: 28, resizeMode: "contain" }}
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

        {/* ফসল ব্যবস্থাপনা নির্দেশিকা */}
        <Text style={styles.cropManagementTitle}>ফসল ব্যবস্থাপনা নির্দেশিকা</Text>
        <View style={styles.cropManagementSection}>
          {cropManagement.map((crop, index) => (
            <View key={index} style={styles.cropItem}>
              <View style={styles.cropIconContainer}>
                <Image source={crop.image} style={styles.cropImage} />
              </View>
              <View style={styles.cropTextContainer}>
                <Text style={styles.cropItemTitle}>{crop.title}</Text>
                <Text style={styles.cropItemDescription}>
                  {crop.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* নিচের ন্যাভিগেশন */}
      <View style={styles.bottomNav}>
        {tabs.map((item, index) => {
          const isActive = item.name === activeTab;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.navItem, isActive && styles.activeNavItem]}
              onPress={() => {
                setActiveTab(item.name);
                router.push(item.route);
              }}
            >
              <Image source={item.img} style={styles.navIcon} />
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


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 20,
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
  content: { flex: 1, padding: 20 },

  sectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  leafIcon: { width: 24, height: 24, marginRight: 8 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#333" },
  sectionDescription: { fontSize: 14, color: "#666", marginBottom: 20 },
  fertilizerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    marginTop: 10,
  },

  soilCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  soilHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  soilImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  soilTextContainer: { flex: 1 },
  soilName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  soilDescription: { fontSize: 14, color: "#666", marginTop: 5 },
  colorIndicator: { height: 4, borderRadius: 2, marginTop: 5 },

  fertilizerSection: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
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
  fertilizerDescription: { fontSize: 14, color: "#666", marginLeft: 46 },

  cropManagementSection: {
    backgroundColor: "#f0f8ff",
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  cropManagementTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "left",
  },
  cropItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cropIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e3f2fd",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cropImage: { width: 24, height: 24, resizeMode: "contain" },
  cropTextContainer: { flex: 1 },
  cropItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  cropItemDescription: { fontSize: 14, color: "#666", lineHeight: 18 },

  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 10,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  activeNavItem: { borderColor: "#4CAF50", backgroundColor: "#eaf8ea" },
  navIcon: { width: 28, height: 28, marginBottom: 5, resizeMode: "contain" },
  navText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
  },
  activeNavText: { color: "#4CAF50", fontWeight: "700" },
});
