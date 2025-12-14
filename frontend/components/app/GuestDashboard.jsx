import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

// ✅ Import all images at the top
import tipImg from "@/assets/tip.jpg";
import cartIcon from "@/assets/cart.png";
import booksIcon from "@/assets/books.png";
import robotIcon from "@/assets/robot.png";
import leafIcon from "@/assets/leaf.jpg";
import riceImg from "@/assets/rice.png";
import carrotImg from "@/assets/carrot.png";
import starIcon from "@/assets/star-icon.webp";
import bookIcon from "@/assets/book-icon.png";
import waterPump from "@/assets/water-pump.jpg";
import homeIcon from "@/assets/home-icon.png";
import productsIcon from "@/assets/products-icon.png";
import learnIcon from "@/assets/learn-icon.webp";
import chatIcon from "@/assets/chat-icon.png";

export default function GuestDashboard() {
  const [activeNav, setActiveNav] = useState("হোম");

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Welcome */}
        <Text style={styles.welcome}>স্বাগতম, অতিথি!</Text>
        <Text style={styles.subtext}>
          AgriXpert-এর শিক্ষামূলক রিসোর্স এক্সপ্লোর করুন এবং পণ্য ব্রাউজ করুন
        </Text>

        {/* Daily Tip */}
        <View style={styles.tipCard}>
          <Image source={tipImg} style={styles.tipIcon} />
          <View style={styles.tipTextContainer}>
            <Text style={styles.tipTitle}>আজকের চাষাবাদের পরামর্শ</Text>
            <Text style={styles.tipDesc}>
              শীতকালে টমেটোর ভালো ফলনের জন্য কম্পোস্ট সার ব্যবহার করুন এবং নিয়মিত পানি দিন।
            </Text>
            <Text style={styles.tipFooter}>দৈনিক চাষাবাদ পরামর্শ</Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresShadedContainer}>
          <View style={styles.featuresContainer}>
            <TouchableOpacity
              style={[styles.featureCard, styles.featureCard1]}
              onPress={() => router.push("/browse")}
            >
              <View style={styles.featureIconContainer}>
                <Image source={cartIcon} style={styles.featureIcon} />
              </View>
              <Text style={styles.featureTitle}>পণ্য ব্রাউজ করুন</Text>
              <Text style={styles.featureDesc}>কৃষি পণ্য অনুসন্ধান ও ফিল্টার</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.featureCard, styles.featureCard2]}
              onPress={() => router.push("/LearnArti")}
            >
              <View style={styles.featureIconContainer}>
                <Image source={booksIcon} style={styles.featureIcon} />
              </View>
              <Text style={styles.featureTitle}>শিক্ষা কেন্দ্র</Text>
              <Text style={styles.featureDesc}>শিক্ষামূলক কনটেন্ট </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.featureCard, styles.featureCard3]}
              onPress={() => router.push("/Ai")}
            >
              <View style={styles.featureIconContainer}>
                <Image source={robotIcon} style={styles.featureIcon} />
              </View>
              <Text style={styles.featureTitle}>এআই সহকারী</Text>
              <Text style={styles.featureDesc}>চাষাবাদের প্রশ্ন করুন</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.featureCard, styles.featureCard4]}
              onPress={() => router.push("/SoilGuide")}
            >
              <View style={styles.featureIconContainer}>
                <Image source={leafIcon} style={styles.featureIcon} />
              </View>
              <Text style={styles.featureTitle}>মাটি গাইড</Text>
              <Text style={styles.featureDesc}>মাটির ধরন ও সার</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>বৈশিষ্ট্যযুক্ত পণ্য</Text>
            <TouchableOpacity onPress={() => router.push("/browse")}>
              <Text style={styles.viewAllText}>সব দেখুন</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productsContainer}>
            <View style={styles.productCard}>
              <Image source={riceImg} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>বাসমতি চাল</Text>
                <View style={styles.productDetails}>
                  <Text style={styles.productPrice}>৳85/কেজি</Text>
                  <View style={styles.ratingContainer}>
                    <Image source={starIcon} style={styles.starIcon} />
                    <Text style={styles.rating}>4.8</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.productCard}>
              <Image source={carrotImg} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>গাজর</Text>
                <View style={styles.productDetails}>
                  <Text style={styles.productPrice}>৳45/কেজি</Text>
                  <View style={styles.ratingContainer}>
                    <Image source={starIcon} style={styles.starIcon} />
                    <Text style={styles.rating}>4.9</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Latest Learning Content */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>সর্বশেষ শিক্ষামূলক বিষয়</Text>
            <TouchableOpacity onPress={() => router.push("/LearnArti")}>
              <Text style={styles.viewAllText}>সব দেখুন</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.learningContent}>
            <View style={styles.learningItem}>
              <View style={styles.learningIcon}>
                <Image source={bookIcon} style={styles.learningImage} />
              </View>
              <View style={styles.learningInfo}>
                <Text style={styles.learningDesc}>আধুনিক ধানের চাষ পদ্ধতি</Text>
                <Text style={styles.learningTitle}>৫ মিনিট পড়া </Text>
              </View>
            </View>

            <View style={styles.learningItem}>
              <View style={styles.learningIcon}>
                <Image source={waterPump} style={styles.learningImage} />
              </View>
              <View style={styles.learningInfo}>
                <Text style={styles.learningDesc}>শীতকালীন সবজির চাষ</Text>
                <Text style={styles.learningTitle}>ভিডিও টিউটোরিয়াল </Text>
              </View>
            </View>
          </View>

          {/* CTA */}
          <View style={styles.ctaSection}>
            <Text style={styles.ctaTitle}>শুরু করতে প্রস্তুত?</Text>
            <Text style={styles.ctaSubtitle}>
              হাজার হাজার কৃষক ও ক্রেতার সাথে AgriXpert-এ যোগ দিন
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => router.push("/login")}
                style={styles.signInButton}
              >
                <Text style={styles.signInButtonText}>সাইন ইন</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/register")}
                style={styles.registerButton}
              >
                <Text style={styles.registerButtonText}>রেজিস্টার</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {[
          { name: "হোম", icon: homeIcon, route: "/GuestHome" },
          { name: "পণ্য", icon: productsIcon, route: "/browse" },
          { name: "শিখুন", icon: learnIcon, route: "/LearnArti" },
          { name: "এআই চ্যাট", icon: chatIcon, route: "/Ai" },
        ].map((item) => {
          const isActive = activeNav === item.name;
          return (
            <TouchableOpacity
              key={item.name}
              style={[styles.navItem, isActive && styles.navItemActive]}
              onPress={() => {
                setActiveNav(item.name);
                router.push(item.route);
              }}
            >
              <Image
                source={item.icon}
                style={
                  item.name === "এআই চ্যাট"
                    ? styles.navAIChatIcon
                    : styles.navIcon
                }
              />
              <Text
                style={[styles.navText, isActive && styles.navActiveText]}
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


// ✅ Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  scrollView: { flex: 1 },
  logoBox: {
    backgroundColor: "#28a745",
    width: 45,
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  logoText: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  appName: { fontSize: 18, fontWeight: "bold", color: "#000" },
  subtitle: { fontSize: 13, color: "#666" },
  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    paddingHorizontal: 20,
    paddingTop: 4,
    marginTop:-6
  },
  subtext: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  tipCard: {
    flexDirection: "row",
    backgroundColor: "#f9fff9",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cceccc",
    padding: 15,
    marginBottom: 25,
    alignItems: "flex-start",
    marginHorizontal: 20,
  },
  tipIcon: { width: 40, height: 40, marginRight: 12 },
  // 🔹 Text container so that content stays inside the card width
  tipTextContainer: {
    flex: 1,
  },
  tipTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  tipDesc: {
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
    flexShrink: 1, // extra safety for wrapping
  },
  tipFooter: { color: "#28a745", fontSize: 13, fontWeight: "600" },

  featuresShadedContainer: {
    backgroundColor: "#f8fdf8",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 25,
    padding: 15,
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    width: "48%",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
  },
  featureIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#f0f8f0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  featureIcon: { width: 35, height: 35, resizeMode: "contain" },
  featureTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  featureDesc: { fontSize: 12, color: "#666", textAlign: "center" },

  section: { marginTop: 25, paddingHorizontal: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#000" },
  viewAllText: { color: "#28a745", fontSize: 14, fontWeight: "600" },

  productsContainer: { marginBottom: 10 },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  productImage: { width: 60, height: 60, marginRight: 12, borderRadius: 8 },
  productInfo: { flex: 1 },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 5,
  },
  productDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: { fontSize: 18, fontWeight: "bold", color: "#28a745" },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  starIcon: { width: 16, height: 16, marginRight: 6 },
  rating: { fontSize: 14, fontWeight: "600", color: "#000" },

  learningContent: { marginBottom: 20 },
  learningItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  learningIcon: {
    width: 50,
    height: 50,
    backgroundColor: "#f0f8f0",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  learningImage: { width: 28, height: 28 },
  learningInfo: { flex: 1 },
  learningTitle: { fontSize: 13, color: "#666", marginBottom: 3 },
  learningDesc: { fontSize: 16, fontWeight: "600", color: "#000" },

  ctaSection: {
    backgroundColor: "#f8fdf8",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  ctaTitle: { fontSize: 18, fontWeight: "bold", color: "#000", marginBottom: 5 },
  ctaSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
  },
  buttonContainer: { flexDirection: "row", justifyContent: "center" },
  signInButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#28a745",
    borderRadius: 8,
    paddingHorizontal: 25,
    paddingVertical: 12,
    marginRight: 10,
  },
  signInButtonText: { color: "#28a745", fontWeight: "600" },
  registerButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#28a745",
    borderRadius: 8,
    paddingHorizontal: 25,
    paddingVertical: 12,
  },
  registerButtonText: { color: "#28a745", fontWeight: "600" },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  navItem: {
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  navItemActive: { borderColor: "#28a745" },
  navIcon: { width: 24, height: 24, marginBottom: 4, resizeMode: "contain" },
  navAIChatIcon: {
    width: 31,
    height: 29,
    marginBottom: 4,
    resizeMode: "contain",
  },
  navText: { fontSize: 12, color: "#666" },
  navActiveText: { color: "#28a745", fontWeight: "600" },
});
