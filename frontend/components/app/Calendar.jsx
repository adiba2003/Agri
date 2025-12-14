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
  const [activeNav, setActiveNav] = useState("হোম");
  const [checkedTasks, setCheckedTasks] = useState({});

  const navItems = [
    { name: "হোম", image: homeIcon, route: "/FarmerDashboard" },
    { name: "পণ্য", image: productsIcon, route: "/FarmerProducts" },
    { name: "আবহাওয়া", image: weatherIcon, route: "/Calendar" },
    { name: "সহায়তা", image: helpIcon, route: "/FAi" },
    { name: "অর্ডার", notification: 15, image: ordersIcon, route: "/FarmerOrders" },
  ];

  const calendarData = {
    month: "অক্টোবর ২০২৫",
    days: ["বুধ", "বৃহঃ", "শুক্র", "শনি", "রবি", "সোম", "মঙ্গল"],
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
      title: "ধানের জমিতে সেচ দিন",
      items: ["৬:০০ AM - ৮:০০ AM • জরুরি"],
      image: waterIcon,
    },
    {
      id: 2,
      title: "টমেটো গাছে সার প্রয়োগ",
      items: ["৪:০০ PM - ৬:০০ PM"],
      image: leafImg,
    },
    {
      id: 3,
      title: "আবহাওয়ার পূর্বাভাস দেখুন",
      items: ["যেকোনো সময়"],
      image: weatherColor,
    },
  ];

  const cropCards = [
    {
      id: 1,
      title: "শাকসবজি",
      crops: "পালং, লালশাক, মূলা",
      season: "রোপণ সময়: ডিসেম্বর - জানুয়ারি",
      image: vegetablesImg,
    },
    {
      id: 2,
      title: "মূলজাতীয় ফসল",
      crops: "গাজর, বিট, শালগম",
      season: "রোপণ সময়: নভেম্বর - ডিসেম্বর",
      image: carrotImg,
    },
    {
      id: 3,
      title: "মসলা",
      crops: "মরিচ, ধনে, জিরা",
      season: "রোপণ সময়: অক্টোবর - নভেম্বর",
      image: chiliImg,
    },
    {
      id: 4,
      title: "বাল্বজাতীয় ফসল",
      crops: "পেঁয়াজ, রসুন, লিক",
      season: "রোপণ সময়: নভেম্বর - ডিসেম্বর",
      image: onionImg,
    },
  ];

  const nextWeekTasks = [
    {
      id: 1,
      title: "ধান কাটার প্রস্তুতি",
      detail: "৯ অক্টোবর • যন্ত্রপাতি প্রস্তুত করুন",
      image: riceImg,
    },
    {
      id: 2,
      title: "গাজরের বীজ বপন",
      detail: "১৪ অক্টোবর • জমি প্রস্তুত করুন",
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={calendarIconImg} style={styles.calendarIcon} />
            <Text style={styles.screenTitle}>কৃষি ক্যালেন্ডার</Text>
          </View>
          <Text style={styles.screenSubtitle}>
            আপনার ফসল পরিকল্পনা করুন এবং কৃষি কাজ ট্র্যাক করুন
          </Text>
        </View>

        <View style={styles.calendarCard}>
          <Text style={styles.monthTitle}>{calendarData.month}</Text>

          <View style={styles.daysHeader}>
            {calendarData.days.map((day, index) => (
              <Text key={index} style={styles.dayText}>
                {day}
              </Text>
            ))}
          </View>

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

          <View style={styles.divider} />

          {/* আজকের কাজ */}
          <View style={styles.tasksSection}>
            <Text style={styles.tasksTitle}>আজকের কাজ (৬ অক্টোবর)</Text>

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

          {/* আবহাওয়া সতর্কতা */}
          <View style={styles.alertCard}>
            <Image source={weatherColor} style={styles.alertImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.alertTitle}>আবহাওয়া সতর্কতা</Text>
              <Text style={styles.alertText}>
                আগামী ৩ দিন বৃষ্টির সম্ভাবনা রয়েছে। ধান কাটার কাজ এগিয়ে নিন এবং সেচ কার্য বন্ধ রাখুন।
              </Text>
              <TouchableOpacity
                style={styles.alertButton}
                onPress={() => router.push("/FAi")}
              >
                <Text style={styles.alertButtonText}>AI থেকে পরামর্শ নিন</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* শীতকালীন চাষাবাদ নির্দেশিকা */}
          <Text style={styles.cultivationTitle}>শীতকালীন চাষাবাদ নির্দেশিকা</Text>

          <View style={styles.cardsGrid}>
            {cropCards.map((card) => (
              <View key={card.id} style={styles.cropCard}>
                <Image source={card.image} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardCrops}>{card.crops}</Text>
                <Text style={styles.cardSeason}>{card.season}</Text>
              </View>
            ))}
          </View>

          {/* আগামী সপ্তাহের কাজ */}
          <View style={styles.nextWeekBox}>
            <Text style={styles.nextWeekTitle}>আগামী সপ্তাহের কাজ</Text>
            {nextWeekTasks.map((task, index) => {
              const daysLeft = index === 0 ? "৩ দিন বাকি" : "৮ দিন বাকি";
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

      {/* নিচের ন্যাভ */}
      <View style={styles.bottomNav}>
        {navItems.map((item, index) => {
          const isActive = activeNav === item.name;
          const showBadge = item.notification != null && item.name === "অর্ডার";

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
