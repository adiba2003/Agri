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
  const [activeNav, setActiveNav] = useState("শিখুন");

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // === Article Data ===
  const articles = [
    {
      id: 1,
      title: "আধুনিক ধানের চাষ পদ্ধতি",
      desc: "উচ্চ ফলনশীল ধানের জন্য বৈজ্ঞানিক চাষ পদ্ধতি ও যত্ন সম্পর্কে বিস্তারিত জানুন।",
      image: riceIcon,
      date: "১০ ডিসেম্বর, ২০২৪",
      time: "৫ মিনিট পড়া",
      fullContent: `
বৈজ্ঞানিক চাষাবাদের কৌশলের কারণে আধুনিক ধানের চাষ অনেক উন্নত হয়েছে। গুরুত্বপূর্ণ ধাপগুলো হলো:

1. **বীজ নির্বাচন:**  
   উচ্চ ফলনশীল ও রোগ প্রতিরোধী ধানের জাত বেছে নিন।

2. **বীজতলা প্রস্তুতি:**  
   উত্তোলিত বীজতলা ব্যবহার করুন যাতে মূল ভালোভাবে বৃদ্ধি পায়।

3. **আধুনিক রোপণ:**  
   যান্ত্রিক রোপণ শ্রম কমায় এবং সমজাতীয় বৃদ্ধি নিশ্চিত করে।

4. **সারের ব্যবস্থাপনা:**  
   ইউরিয়া, টিএসপি, পটাশ সঠিক অনুপাতে এবং সঠিক সময়ে প্রয়োগ করুন।

5. **জল ব্যবস্থাপনা:**  
   সর্বোচ্চ উৎপাদনের জন্য ২–৩ সেমি স্থির পানি বজায় রাখুন।

6. **পোকামাকড় নিয়ন্ত্রণ:**  
   ক্ষতিকারক পোকামাকড় কমাতে ফারোমোন ট্র্যাপ এবং জৈব সার ব্যবহার করুন।

এই ধাপগুলো অনুসরণ করলে ধানের ফলন ৩০–৪০% পর্যন্ত বৃদ্ধি পেতে পারে।
      `,
    },
    {
      id: 2,
      title: "শীতকালীন সবজির চাষ",
      desc: "পুষ্টিকর শীতকালীন সবজি চাষের কৌশল ও যত্ন।",
      image: carrotIcon,
      date: "৮ ডিসেম্বর, ২০২৪",
      time: "৭ মিনিট পড়া",
      fullContent: `
শীতকালীন সবজি ঠান্ডা আবহাওয়ায় ভালোভাবে জন্মায়। জনপ্রিয় ফসল: গাজর, বাঁধাকপি, মূলা, টমেটো, বিটরুট ইত্যাদি।

### সফল শীতকালীন সবজি চাষের ধাপ:

1. **মাটি প্রস্তুতি:**  
   নরম, উর্বর, ভালো নিকাশযুক্ত লোমি মাটি ব্যবহার করুন এবং কম্পোস্ট দিয়ে সমৃদ্ধ করুন।

2. **বীজ রোপণ:**  
   স্বাস্থ্যকর অঙ্কুরের জন্য বীজ ট্রেতে বপন করুন।

3. **সেচ ব্যবস্থাপনা:**  
   অতিরিক্ত পানি দেওয়া এড়িয়ে চলুন—মাটির আর্দ্রতা বজায় রাখুন।

4. **রোগ প্রতিরোধ:**  
   ফাঙ্গাসের আক্রমণ রোধ করতে ৭–১০ দিনে একবার নীম তেল স্প্রে করুন।

5. **ফসল তোলা:**  
   সবজি সকালে তোলা হলে দীর্ঘ সময় তাজা থাকে।

সঠিক যত্ন নিলে কৃষকরা শীতকালীন মৌসুমে ভালো লাভ করতে পারবেন।
      `,
    },
    {
      id: 3,
      title: "সেচ ব্যবস্থাপনা",
      desc: "কার্যকর সেচ ব্যবস্থা এবং আধুনিক প্রযুক্তি ব্যবহার।",
      image: waterIcon,
      date: "৫ ডিসেম্বর, ২০২৪",
      time: "৬ মিনিট পড়া",
      fullContent: `
সঠিক সেচ ব্যবস্থাপনা পানি সাশ্রয় করে এবং ফসলের উৎপাদন বৃদ্ধি করে।

### স্মার্ট সেচের টিপস:

1. **ড্রিপ ইরিগেশন:**  
   ৪০–৬০% পানি সাশ্রয় করে এবং উৎপাদন বাড়ায়।

2. **স্প্রিঙ্কলার সিস্টেম:**  
   সবজি ও পাতাযুক্ত গাছের জন্য উপযুক্ত।

3. **মাটির আর্দ্রতা পর্যবেক্ষণ:**  
   অতিরিক্ত পানি এড়াতে মাটির আর্দ্রতা সেন্সর বা হাত দিয়ে পরীক্ষা করুন।

4. **জল দেওয়ার সময়:**  
   বাষ্পীভবন কমাতে সকালে বা সন্ধ্যায় পানি দিন।

5. **বর্ষার পানি সংরক্ষণ:**  
   পরবর্তী চাষের জন্য বর্ষার পানি সংগ্রহ ও সংরক্ষণ করুন।

6. **ক্ষেত সমতলীকরণ:**  
   লেজার সমতলীকরণ পানি ব্যবহারে ২৫% কমায়।

কার্যকর সেচ ব্যবস্থাপনা স্বাস্থ্যকর ফসল নিশ্চিত করে এবং কৃষকের খরচ কমায়।
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
            <Text style={styles.closeBtnText}>বন্ধ করুন</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      {/* ===== Scrollable Content ===== */}
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.titleSection}>
          <Image source={booksIcon} style={styles.iconImage} />
          <View>
            <Text style={styles.title}>শিক্ষা কেন্দ্র</Text>
            <Text style={styles.subTitleText}>
              শিক্ষামূলক ব্লগ এবং ভিডিও টিউটোরিয়াল 
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
                {tab.name === "Articles" ? "আর্টিকেল" : tab.name === "Videos" ? "ভিডিও" : "মাটি গাইড"}
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
          { name: "হোম", image: homeIcon, route: "/GuestHome" },
          { name: "পণ্য", image: productsIcon, route: "/browse" },
          { name: "শিখুন", image: learnIcon, route: "/LearnArti" },
          { name: "এআই চ্যাট", image: chatIcon, route: "/Ai" },
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
  title: { fontSize: 20, fontWeight: "bold", color: "#333" ,marginTop:-21},
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
