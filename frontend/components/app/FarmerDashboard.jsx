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
import { router } from "expo-router";

// ✅ Import all images at the top
import backArrow from "@/assets/back-arrow.png";
import notificationIconImg from "@/assets/notification.png";
import orderIcon from "@/assets/order.png";
import cartIcon from "@/assets/cart.png";
import moneyIcon from "@/assets/money.png";
import calendarIcon from "@/assets/calendar-icon.png";
import robotIcon from "@/assets/robot.png";
import plusIcon from "@/assets/plus.png";
import booksIcon from "@/assets/books.png";
import riceImg from "@/assets/rice.png";
import tomatoImg from "@/assets/tomato.png";
import homeIcon from "@/assets/home-icon.png";
import productsIcon from "@/assets/products-icon.png";
import weatherIcon from "@/assets/weather.png";
import helpIcon from "@/assets/help.png";
import ordersIcon from "@/assets/orders.png";

export default function FarmerDashboard() {
  const [activeNav, setActiveNav] = useState("হোম");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Screen Title */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.screenTitle}>কৃষক ড্যাশবোর্ড</Text>
          <Text style={styles.screenSubtitle}>
            আপনার পণ্য ও অর্ডারসমূহ পরিচালনা করুন
          </Text>
        </View>

        {/* Dashboard Top Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Image source={orderIcon} style={styles.statIcon} />
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>পণ্য</Text>
          </View>
          <View style={styles.statCard}>
            <Image source={cartIcon} style={styles.statIcon} />
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>নতুন অর্ডার</Text>
          </View>
          <View style={styles.statCard}>
            <Image source={moneyIcon} style={styles.statIcon} />
            <Text style={styles.statNumber}>৳2.5k</Text>
            <Text style={styles.statLabel}>এই মাসে</Text>
          </View>
        </View>

        {/* Today’s Farm Task */}
        <View style={styles.taskCard}>
          <Image source={calendarIcon} style={styles.taskIcon} />
          <View style={styles.taskTextBox}>
            <Text style={styles.taskTitle}>আজকের কৃষিকাজ</Text>
            <Text style={styles.taskDetail}>• ধান কাটা (সকাল ৬টা - ৮টা)</Text>
            <Text style={styles.taskDetail}>• টমেটো গাছে সার প্রয়োগ</Text>
            <Text style={styles.taskDetail}>• আবহাওয়ার পূর্বাভাস যাচাই</Text>
            <TouchableOpacity onPress={() => router.push("/Calendar")}>
              <Text style={styles.viewFullCalendar}>সম্পূর্ণ ক্যালেন্ডার দেখুন →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Action Cards */}
        <View style={styles.quickActionsGrid}>
          
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/FarmerProducts")}
          >
            <Image source={orderIcon} style={styles.actionImage} />
            <View style={styles.actionTextBox}>
              <Text style={styles.actionTitle}>আমার পণ্য</Text>
              <Text style={styles.actionSubtitle}>লিস্টিং পরিচালনা করুন</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/FarmerOrders")}
          >
            <Image source={cartIcon} style={styles.actionImage} />
            <View style={styles.actionTextBox}>
              <Text style={styles.actionTitle}>অর্ডার</Text>
              <Text style={styles.actionSubtitle}>১৫টি পেন্ডিং</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/Calendar")}
          >
            <Image source={calendarIcon} style={styles.actionImage} />
            <View style={styles.actionTextBox}>
              <Text style={styles.actionTitle}>কৃষি ক্যালেন্ডার</Text>
              <Text style={styles.actionSubtitle}>ফসল পরিকল্পনা করুন</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/FAi")}
          >
            <Image source={robotIcon} style={styles.actionImage} />
            <View style={styles.actionTextBox}>
              <Text style={styles.actionTitle}>এআই সহকারী</Text>
              <Text style={styles.actionSubtitle}>কৃষি বিষয়ক প্রশ্ন করুন</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/NewProduct")}
          >
            <Image source={plusIcon} style={styles.actionImage} />
            <View style={styles.actionTextBox}>
              <Text style={styles.actionTitle}>পণ্য যোগ করুন</Text>
              <Text style={styles.actionSubtitle}>নতুন আইটেম তালিকাভুক্ত করুন</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/FLearn")}
          >
            <Image source={booksIcon} style={styles.actionImage} />
            <View style={styles.actionTextBox}>
              <Text style={styles.actionTitle}>শিখুন</Text>
              <Text style={styles.actionSubtitle}>কৃষি গাইডলাইন</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Recent Orders Section */}
        <View style={styles.recentOrders}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>সাম্প্রতিক অর্ডার</Text>
            <TouchableOpacity onPress={() => router.push("/FarmerOrders")}>
              <Text style={styles.viewAll}>সব দেখুন</Text>
            </TouchableOpacity>
          </View>

          {/* Order 1 */}
          <View style={styles.orderCard}>
            <Image source={riceImg} style={styles.orderIcon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.orderName}>বাসমতি চাল - ১০ কেজি</Text>
              <Text style={styles.orderDetails}>অর্ডার #1236 • ৳৮৫০</Text>
            </View>
            <TouchableOpacity style={styles.processBtn}>
              <Text style={styles.processText}>প্রসেস করুন</Text>
            </TouchableOpacity>
          </View>

          {/* Order 2 */}
          <View style={styles.orderCard}>
            <Image source={tomatoImg} style={styles.orderIcon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.orderName}>টমেটো - ৫ কেজি</Text>
              <Text style={styles.orderDetails}>অর্ডার #1237 • ৳৩০০</Text>
            </View>
            <TouchableOpacity style={styles.shipBtn}>
              <Text style={styles.shipText}>শিপ করুন</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {[
          { name: "হোম", image: homeIcon, route: "/FarmerDashboard" },
          { name: "পণ্য", image: productsIcon, route: "/FarmerProducts" },
          { name: "আবহাওয়া", image: weatherIcon, route: "/FarmerDashboard" },
          { name: "সহায়তা", image: helpIcon, route: "/FarmerDashboard" },
          { name: "অর্ডার", image: ordersIcon, notification: 15, route: "/FarmerOrders" },
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
  headerNotificationText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  content: { flex: 1, padding: 20 },
  screenTitle: { fontSize: 22, fontWeight: "bold", color: "#2c3e50" },
  screenSubtitle: { fontSize: 14, color: "#666", marginTop: 4 },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    alignItems: "center",
    elevation: 3,
  },
  statIcon: { width: 24, height: 24, marginBottom: 8, resizeMode: "contain" },
  statNumber: { fontSize: 20, fontWeight: "bold", color: "#2c3e50" },
  statLabel: { fontSize: 12, color: "#666", fontWeight: "500" },
  taskCard: {
    flexDirection: "row",
    backgroundColor: "#eaf8ea",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    alignItems: "flex-start",
  },
  taskIcon: { width: 40, height: 40, marginRight: 12, resizeMode: "contain" },
  taskTextBox: { flex: 1 },
  taskTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  taskDetail: { fontSize: 13, color: "#333", marginBottom: 2 },
  viewFullCalendar: {
    marginTop: 6,
    fontSize: 13,
    color: "#4CAF50",
    fontWeight: "600",
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  actionCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  actionImage: { width: 40, height: 40, marginRight: 12, resizeMode: "contain" },
  actionTextBox: { flex: 1, flexShrink: 1 },
  actionTitle: { fontSize: 14, fontWeight: "bold", color: "#2c3e50" },
  actionSubtitle: { fontSize: 12, color: "#666", flexWrap: "wrap" },
  recentOrders: { backgroundColor: "#fff", borderRadius: 12, padding: 15 },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  recentTitle: { fontSize: 16, fontWeight: "bold", color: "#2c3e50" },
  viewAll: { fontSize: 13, color: "#4CAF50", fontWeight: "600" },
  orderCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
  },
  orderIcon: { width: 36, height: 36, marginRight: 10, resizeMode: "contain" },
  orderName: { fontSize: 14, fontWeight: "bold", color: "#333" },
  orderDetails: { fontSize: 12, color: "#666" },
  processBtn: {
    backgroundColor: "#FFE082",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  processText: { fontSize: 12, color: "#6d4c41", fontWeight: "600" },
  shipBtn: {
    backgroundColor: "#E1F5FE",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  shipText: { fontSize: 12, color: "#0277bd", fontWeight: "600" },
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
  },
  activeNavItem: { backgroundColor: "#eaf8ea" },
  navIcon: { width: 24, height: 24, marginBottom: 4, resizeMode: "contain" },
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
