import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { Video, Audio } from "expo-av";
import { router } from "expo-router";

// Images
import booksIcon from "@/assets/books.png";
import waterPump from "@/assets/water-pump.jpg";
import calendarIcon from "@/assets/calendar-icon.png";
import clockIcon from "@/assets/clock.png";

import homeIcon from "@/assets/home-icon.png";
import productsIcon from "@/assets/products-icon.png";
import learnIcon from "@/assets/learn-icon.webp";
import chatIcon from "@/assets/chat-icon.png";

// LOCAL VIDEOS
import riceVideo from "@/assets/rice.mp4";
import pestVideo from "@/assets/pest.mp4";

export default function LearnVdo() {
  const [activeTab, setActiveTab] = useState("Videos");
  const [activeNav, setActiveNav] = useState("Learn");
  const [videoVisible, setVideoVisible] = useState(false);
  const [videoSource, setVideoSource] = useState(null);

  const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  // 🔊 FIX: ENABLE SOUND EVEN IN SILENT MODE
  useEffect(() => {
    if (videoVisible) {
      (async () => {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true, // SOUND FIX
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });
      })();
    }
  }, [videoVisible]);

  const tabs = [
    { name: "Articles", route: "/LearnArti" },
    { name: "Videos", route: "/LearnVdo" },
    { name: "Soil Guide", route: "/LearnSoil" },
  ];

  const videos = [
    {
      title: "Proper Rice Transplanting Method",
      desc: "Video Tutorial: How to Transplant Rice Properly.",
      date: "Dec 12, 2024",
      time: "15 min",
      image: waterPump,
      video: riceVideo,
    },
    {
      title: "Organic Pesticide Preparation",
      desc: "Method of Making Organic Pesticide with Household Ingredients.",
      date: "Dec 9, 2024",
      time: "12 min",
      image: waterPump,
      video: pestVideo,
    },
  ];

  const bottomNavItems = [
    { name: "Home", image: homeIcon, route: "/GuestHome" },
    { name: "Products", image: productsIcon, route: "/browse" },
    { name: "Learn", image: learnIcon, route: "/LearnArti" },
    { name: "AI Chat", image: chatIcon, route: "/Ai" },
  ];

  return (
    <View style={styles.container}>
      {/* VIDEO PLAYER MODAL */}
      <Modal visible={videoVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Video
            ref={videoRef}
            source={videoSource}
            style={styles.videoPlayer}
            resizeMode="contain"
            shouldPlay
            useNativeControls={false}
            onPlaybackStatusUpdate={(stat) => setStatus(stat)}
          />

          {/* Custom Controls */}
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.ctrlBtn}
              onPress={async () => {
                if (videoRef.current && status.positionMillis != null) {
                  const newPos = Math.max(0, status.positionMillis - 10000);
                  await videoRef.current.setPositionAsync(newPos);
                }
              }}
            >
              <Text style={styles.ctrlText}>⏪ 10s</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.ctrlBtn}
              onPress={async () => {
                if (videoRef.current) {
                  status.isPlaying
                    ? await videoRef.current.pauseAsync()
                    : await videoRef.current.playAsync();
                }
              }}
            >
              <Text style={styles.ctrlText}>
                {status.isPlaying ? "⏸ Pause" : "▶ Play"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.ctrlBtn}
              onPress={async () => {
                if (videoRef.current && status.positionMillis != null) {
                  const newPos = status.positionMillis + 10000;
                  await videoRef.current.setPositionAsync(newPos);
                }
              }}
            >
              <Text style={styles.ctrlText}>10s ⏩</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setVideoVisible(false)}
          >
            <Text style={styles.closeBtnText}>Close Video</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* PAGE CONTENT */}
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

        <View style={styles.tabContainer}>
          {tabs.map((tab, index) => (
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

        {/* Video List */}
        <View style={styles.articleContainer}>
          {videos.map((video, index) => (
            <TouchableOpacity
              key={index}
              style={styles.articleCard}
              onPress={() => {
                setVideoSource(video.video);
                setVideoVisible(true);
              }}
            >
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
            </TouchableOpacity>
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

/* ================== STYLES ================== */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  titleSection: { flexDirection: "row", alignItems: "center", padding: 15 },
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
  },

  articleImage: { width: 50, height: 50, borderRadius: 10, marginRight: 12 },

  articleContent: { flex: 1 },

  articleTitle: { fontSize: 16, fontWeight: "bold" },
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
    backgroundColor: "#fff",
  },

  navItem: { flex: 1, alignItems: "center", paddingVertical: 6 },
  navIcon: { width: 22, height: 22, marginBottom: 4 },
  navText: { fontSize: 12, color: "#333" },

  activeNavItem: { backgroundColor: "#eaf8ea", borderRadius: 10 },
  activeNavText: { color: "#28a745", fontWeight: "bold" },

  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },

  videoPlayer: {
    width: "100%",
    height: 300,
    backgroundColor: "#000",
  },

  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  ctrlBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#28a745",
    borderRadius: 10,
  },

  ctrlText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },

  closeBtn: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    margin: 20,
  },

  closeBtnText: { color: "#fff", fontWeight: "bold" },
});
