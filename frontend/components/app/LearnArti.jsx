import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { router } from "expo-router";

// Images
import booksIcon from "@/assets/books.png";
import riceIcon from "@/assets/rice.png";
import carrotIcon from "@/assets/carrot.png";
import waterIcon from "@/assets/water-icon.png";
import calendarIcon from "@/assets/calendar-icon.png";
import clockIcon from "@/assets/clock.png";

import homeIcon from "@/assets/home-icon.png";
import productsIcon from "@/assets/products-icon.png";
import learnIcon from "@/assets/learn-icon.webp";
import chatIcon from "@/assets/chat-icon.png";

export default function LearnArti() {
  const [activeTab, setActiveTab] = useState("Articles");
  const [activeNav, setActiveNav] = useState("Learn");

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // === Article Data ===
  const articles = [
    {
      id: 1,
      title: "Modern Rice Cultivation Methods",
      desc: "Learn about scientific methods and care for high-yield rice cultivation in detail.",
      image: riceIcon,
      date: "Dec 10, 2024",
      time: "5 min read",
      fullContent: `
Modern rice cultivation has significantly improved due to scientific farming techniques. 
Here are some important steps:

1. **Seed Selection:**  
   Choose high-yield, disease-resistant rice varieties.

2. **Seed Bed Preparation:**  
   Use raised beds to ensure better root growth.

3. **Modern Transplanting:**  
   Mechanized transplanting reduces labor and increases uniformity.

4. **Fertilizer Management:**  
   Apply urea, TSP, and potash in the correct ratios at proper stages.

5. **Water Management:**  
   Maintain 2–3 cm standing water for best productivity.

6. **Pest Control:**  
   Use pheromone traps & organic pesticides to reduce harmful insects.

Following these steps can increase rice yield by 30–40%.
      `,
    },
    {
      id: 2,
      title: "Winter Vegetable Cultivation",
      desc: "Skills and care for growing nutritious winter vegetables.",
      image: carrotIcon,
      date: "Dec 8, 2024",
      time: "7 min read",
      fullContent: `
Winter vegetables grow best in cool temperatures. Popular crops include carrots, cabbage, radish, tomato, beetroot, etc.

### Steps for Successful Winter Vegetable Cultivation:

1. **Soil Preparation**  
   Use soft, fertile, well-drained loamy soil enriched with compost.

2. **Seed Sowing**  
   Sow seeds in seed trays for healthier seedlings.

3. **Irrigation Management**  
   Avoid excess watering—maintain moisture only.

4. **Disease Protection**  
   Use neem oil spray every 7–10 days to prevent fungal attacks.

5. **Harvesting**  
   Vegetables remain fresh longer if picked early morning.

With proper care, farmers can earn high profits in winter seasons.
      `,
    },
    {
      id: 3,
      title: "Irrigation Management",
      desc: "Efficient irrigation systems and use of modern technology in water management.",
      image: waterIcon,
      date: "Dec 5, 2024",
      time: "6 min read",
      fullContent: `
Proper irrigation management saves water and increases crop yield.

### Smart Irrigation Tips:

1. **Drip Irrigation:**  
   Saves 40–60% water and improves productivity.

2. **Sprinkler Systems:**  
   Best for vegetables and leafy greens.

3. **Soil Moisture Monitoring:**  
   Use soil moisture sensors or hand-testing to avoid over-watering.

4. **Water Timing:**  
   Water crops early morning or evening to reduce evaporation.

5. **Rainwater Harvesting:**  
   Collect and store rainwater for later crop use.

6. **Field Leveling:**  
   Laser leveling reduces water-use by 25%.

Efficient irrigation ensures healthier crops and reduces cost for farmers.
      `,
    },
  ];

  const openArticle = (article) => {
    setSelectedArticle(article);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* ===== MODAL FOR FULL ARTICLE ===== */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={styles.modalContainer}>
          <Image source={selectedArticle?.image} style={styles.modalImage} />

          <Text style={styles.modalTitle}>{selectedArticle?.title}</Text>

          <View style={styles.modalMeta}>
            <Text style={styles.modalMetaText}>{selectedArticle?.date}</Text>
            <Text style={styles.modalMetaText}>• {selectedArticle?.time}</Text>
          </View>

          <Text style={styles.modalContent}>{selectedArticle?.fullContent}</Text>

          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeBtnText}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      {/* ===== Scrollable Content ===== */}
      <ScrollView style={{ flex: 1 }}>
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
            { name: "Articles", route: "/LearnArti" },
            { name: "Videos", route: "/LearnVdo" },
            { name: "Soil Guide", route: "/LearnSoil" },
          ].map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, activeTab === tab.name && styles.activeTab]}
              onPress={() => {
                setActiveTab(tab.name);
                router.push(tab.route);
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
          {articles.map((arti) => (
            <TouchableOpacity
              key={arti.id}
              style={styles.articleCard}
              onPress={() => openArticle(arti)}
            >
              <Image source={arti.image} style={styles.articleImage} />
              <View style={styles.articleContent}>
                <Text style={styles.articleTitle}>{arti.title}</Text>
                <Text style={styles.articleDesc}>{arti.desc}</Text>

                <View style={styles.articleFooter}>
                  <View style={styles.footerItem}>
                    <Image source={calendarIcon} style={styles.footerIcon} />
                    <Text style={styles.articleDate}>{arti.date}</Text>
                  </View>
                  <View style={styles.footerItem}>
                    <Image source={clockIcon} style={styles.footerIcon} />
                    <Text style={styles.articleTime}>{arti.time}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {[
          { name: "Home", image: homeIcon, route: "/GuestHome" },
          { name: "Products", image: productsIcon, route: "/browse" },
          { name: "Learn", image: learnIcon, route: "/LearnArti" },
          { name: "AI Chat", image: chatIcon, route: "/Ai" },
        ].map((item, index) => {
          const isActive = item.name === activeNav;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.navItem, isActive && styles.activeNavItem]}
              onPress={() => {
                setActiveNav(item.name);
                router.push(item.route);
              }}
            >
              <Image source={item.image} style={styles.navIcon} />
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

//////////////////////////////////////////////////
//                STYLES
//////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

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
  },

  articleImage: { width: 60, height: 60, borderRadius: 10, marginRight: 12 },
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
  navText: { fontSize: 12, color: "#333" },
  activeNavText: { color: "#28a745", fontWeight: "bold" },

  // MODAL STYLES
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  modalImage: {
    width: "100%",
    height: 160,
    resizeMode: "contain",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalMeta: { flexDirection: "row", marginBottom: 10 },
  modalMetaText: { color: "#777", marginRight: 10 },

  modalContent: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
    marginBottom: 20,
  },

  closeBtn: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  closeBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
