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

// ✅ Assets (alias path ব্যবহার করে)
import homeIcon from "@/assets/home-icon.png";
import productsIcon from "@/assets/home-icon.png";
import weatherIcon from "@/assets/weather.png";
import helpIcon from "@/assets/help.png";
import ordersIcon from "@/assets/orders.png";
import calendarIconImg from "@/assets/calendar-icon.png";
import waterIcon from "@/assets/water-icon.png";
import leafImg from "@/assets/leaf.jpg";
import weatherColor from "@/assets/weather-colour.png";
import vegetablesImg from "@/assets/vegetables.png";
import carrotImg from "@/assets/carrot.png";
import chiliImg from "@/assets/chili.png";
import onionImg from "@/assets/onion.png";
import riceImg from "@/assets/rice.png";

export default function Calendar() {
  const [activeNav, setActiveNav] = useState("Home");
  const [checkedTasks, setCheckedTasks] = useState({});

  // Bottom navigation items (Expo Router routes)
  const navItems = [
    { name: "Home", image: homeIcon, route: "/FarmerDashboard" },
    { name: "Products", image: productsIcon, route: "/FarmerProducts" },
    { name: "Weather", image: weatherIcon, route: "/Calendar" },
    { name: "Help", image: helpIcon, route: "/FAi" },
    { name: "Orders", image: ordersIcon, notification: 15, route: "/FarmerOrders" },
  ];

  // Calendar data
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

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Screen Title with calendar icon */}
        <View style={styles.titleSection}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={calendarIconImg} style={styles.calendarIcon} />
            <Text style={styles.screenTitle}>Farming Calendar</Text>
          </View>
          <Text style={styles.screenSubtitle}>
            Plan your crops and track farming activities
          </Text>
        </View>

        {/* Calendar Section */}
        <View style={styles.calendarCard}>
          <Text style={styles.monthTitle}>{calendarData.month}</Text>

          {/* Days Header */}
          <View style={styles.daysHeader}>
            {calendarData.days.map((day, index) => (
              <Text key={index} style={styles.dayText}>
                {day}
              </Text>
            ))}
          </View>

          {/* Calendar Dates */}
          <View style={styles.calendarGrid}>
            {calendarData.dates.map((week, weekIndex) => (
              <View key={weekIndex} style={styles.weekRow}>
                {week.map((date, dayIndex) => {
                  const isHighlighted =
                    typeof date === "number" && highlightedDates.includes(date);
                  return (
                    <TouchableOpacity
                      key={dayIndex}
                      style={[
                        styles.dateCell,
                        isHighlighted && styles.activeDate,
                      ]}
                      disabled={!date}
                    >
                      <Text
                        style={[
                          styles.dateText,
                          isHighlighted && styles.activeDateText,
                        ]}
                      >
                        {date || ""}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Farming Tasks Section */}
          <View style={styles.tasksSection}>
            <Text style={styles.tasksTitle}>Today's Tasks (6 October)</Text>

            {farmingTasks.map((task) => (
              <TouchableOpacity
                key={task.id}
                style={styles.taskItem}
                onPress={() => toggleTask(task.id)}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.checkbox}>
                    {checkedTasks[task.id] && (
                      <View style={styles.checkboxInner} />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.taskTitle,
                      checkedTasks[task.id] && {
                        textDecorationLine: "line-through",
                        color: "#4CAF50",
                      },
                    ]}
                  >
                    {task.title}
                  </Text>
                  <Image source={task.image} style={styles.taskImage} />
                </View>
                <View style={styles.taskDetails}>
                  {task.items.map((item, idx) => (
                    <Text key={idx} style={styles.taskDetail}>
                      {item}
                    </Text>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Weather Alert Section */}
          <View style={styles.alertCard}>
            <Image source={weatherColor} style={styles.alertImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.alertTitle}>Weather Alert</Text>
              <Text style={styles.alertText}>
                There is a possibility of rain for the next 3 days. Advance the
                rice harvesting work and suspend irrigation activities.
              </Text>
              <TouchableOpacity
                style={styles.alertButton}
                onPress={() => router.push("/FAi")}
              >
                <Text style={styles.alertButtonText}>Get advice from AI</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Winter Cultivation Guide Title */}
          <Text style={styles.cultivationTitle}>Winter Cultivation Guide</Text>

          {/* Crop Cards Grid */}
          <View style={styles.cardsGrid}>
            {cropCards.map((card) => (
              <View key={card.id} style={[styles.cropCard]}>
                <Image source={card.image} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardCrops}>{card.crops}</Text>
                <Text style={styles.cardSeason}>{card.season}</Text>
              </View>
            ))}
          </View>

          {/* Next Week's Tasks */}
          <View style={styles.nextWeekBox}>
            <Text style={styles.nextWeekTitle}>Next Week's Tasks</Text>
            {nextWeekTasks.map((task, index) => {
              const daysLeft = index === 0 ? "3 days left" : "8 days left";
              return (
                <View key={task.id} style={styles.nextTaskCard}>
                  <Image source={task.image} style={styles.nextTaskImage} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.nextTaskTitle}>{task.title}</Text>
                    <Text style={styles.nextTaskDetail}>{task.detail}</Text>
                  </View>
                  <View style={styles.daysLeftTag}>
                    <Text style={styles.daysLeftText}>{daysLeft}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* 🔻 Bottom Navigation (Orders badge up & corner) */}
      <View style={styles.bottomNav}>
        {navItems.map((item, index) => {
          const isActive = activeNav === item.name;
          const showBadge = item.notification != null && item.name === "Orders";

          return (
            <TouchableOpacity
              key={index}
              style={[styles.navItem, isActive && styles.activeNavItem]}
              onPress={() => {
                setActiveNav(item.name);
                router.push(item.route);
              }}
            >
              <View style={styles.navIconWrapper}>
                <Image source={item.image} style={styles.navIcon} />
                {showBadge && (
                  <View style={styles.ordersBadgeBubble}>
                    <Text style={styles.ordersBadgeText}>
                      {item.notification}
                    </Text>
                  </View>
                )}
              </View>
              <Text
                style={[styles.navText, isActive && styles.activeNavText]}
                numberOfLines={1}
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
  container: { flex: 1, backgroundColor: "#f8f9fa" },

  content: { flex: 1, padding: 20 },
  titleSection: { marginBottom: 20 },
  calendarIcon: { width: 24, height: 24, marginRight: 8, resizeMode: "contain" },
  screenTitle: { fontSize: 22, fontWeight: "bold", color: "#2c3e50" },
  screenSubtitle: { fontSize: 14, color: "#666", marginTop: 4 },

  calendarCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
    textAlign: "center",
  },
  daysHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dayText: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  calendarGrid: { marginBottom: 20 },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dateCell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    borderRadius: 6,
  },
  activeDate: { backgroundColor: "#4CAF50" },
  dateText: { fontSize: 14, color: "#333", fontWeight: "500" },
  activeDateText: { color: "#fff", fontWeight: "bold" },

  divider: { height: 1, backgroundColor: "#e0e0e0", marginVertical: 15 },

  tasksSection: { marginTop: 10 },
  tasksTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
  },
  taskItem: { marginBottom: 20 },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    justifyContent: "space-between",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#4CAF50",
    borderRadius: 4,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: "#4CAF50",
    borderRadius: 2,
  },
  taskTitle: { fontSize: 14, fontWeight: "600", color: "#333", flex: 1 },
  taskDetails: { marginLeft: 30 },
  taskDetail: { fontSize: 13, color: "#666", marginBottom: 4 },
  taskImage: { width: 30, height: 30, resizeMode: "contain", marginLeft: 10 },

  alertCard: {
    flexDirection: "row",
    backgroundColor: "#fff3e0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: "#ff9800",
    alignItems: "center",
  },
  alertImage: { width: 50, height: 50, resizeMode: "contain", marginRight: 12 },
  alertTitle: { fontSize: 16, fontWeight: "bold", color: "#e65100", marginBottom: 8 },
  alertText: { fontSize: 14, color: "#333", marginBottom: 12 },
  alertButton: {
    backgroundColor: "#ff9800",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  alertButtonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },

  cultivationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 12,
  },

  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cropCard: {
    width: "48%",
    backgroundColor: "#e8f5e9",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  cardImage: { width: 50, height: 50, resizeMode: "contain", marginBottom: 8 },
  cardTitle: { fontSize: 14, fontWeight: "bold", color: "#2c3e50", marginBottom: 4 },
  cardCrops: { fontSize: 12, color: "#666", textAlign: "center", marginBottom: 2 },
  cardSeason: { fontSize: 12, color: "#4CAF50", textAlign: "center" },

  nextWeekBox: {
    backgroundColor: "#f0f4ff",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  nextWeekTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 12,
  },
  nextTaskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  nextTaskImage: { width: 40, height: 40, resizeMode: "contain", marginRight: 12 },
  nextTaskTitle: { fontSize: 14, fontWeight: "bold", color: "#333" },
  nextTaskDetail: { fontSize: 12, color: "#666" },

  daysLeftTag: {
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start",
  },
  daysLeftText: {
    fontSize: 12,
    color: "#388E3C",
    fontWeight: "600",
  },

  // 🔻 Bottom Navigation
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  activeNavItem: { backgroundColor: "#eaf8ea" },

  navIconWrapper: {
    position: "relative", // badge এর জন্য important
    alignItems: "center",
    justifyContent: "center",
  },
  navIcon: { width: 24, height: 24, resizeMode: "contain" },

  navText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
    marginTop: 4,
  },
  activeNavText: { color: "#4CAF50", fontWeight: "bold" },

  // Orders bubble badge (corner)
  ordersBadgeBubble: {
    position: "absolute",
    top: -4,
    right: -10,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  ordersBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
