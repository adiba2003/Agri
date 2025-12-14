import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Images
import robot from "@/assets/robot.png";
import homeIcon from "@/assets/home-icon.png";
import productsIcon from "@/assets/products-icon.png";
import learnIcon from "@/assets/learn-icon.webp";
import chatIcon from "@/assets/chat-icon.png";

export default function Ai() {
  const [activeNav, setActiveNav] = useState("এআই চ্যাট");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const flatListRef = useRef(null);

  /* ---------------- LOAD CHAT HISTORY ---------------- */
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const saved = await AsyncStorage.getItem("chat_history");
        if (saved !== null) {
          setMessages(JSON.parse(saved));
        } else {
          setMessages([
            {
              id: "0",
              sender: "AI",
              text: "হ্যালো! আমি আপনার AI কৃষি সহকারী। কৃষিকাজ সম্পর্কে যেকোনো প্রশ্ন জিজ্ঞাসা করুন।"
            }
          ]);
        }
      } catch (e) {
        console.log("Load Error:", e);
      }
    };

    loadMessages();
  }, []);

  /* ---------------- SAVE CHAT HISTORY ---------------- */
  useEffect(() => {
    if (messages.length > 0) {
      AsyncStorage.setItem("chat_history", JSON.stringify(messages));
    }

    if (flatListRef.current)
      flatListRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  /* ---------------- AI LOGIC ---------------- */
  const getAIResponse = (q) => {
    q = q.toLowerCase();

    if (q.includes("rice") || q.includes("ধান"))
      return "ধানের রোগ: ব্লাস্ট, ব্লাইট, বাদামী দাগ। নিরাময়ের জন্য নিম তেল + ট্রাইকোডার্মা ব্যবহার করুন।";

    if (q.includes("fertilizer") || q.includes("সার"))
      return "ফুল ফোটার সময় ও বৃদ্ধির প্রাথমিক পর্যায়ে NPK ২০-১০-১০ এবং অতিরিক্ত পটাশ ব্যবহার করুন।";

    if (q.includes("vegetable") || q.includes("সবজি"))
      return "শীতের জনপ্রিয় সবজি: গাজর, বাঁধাকপি, ফুলকপি, মুলা, পালং শাক।";

    if (q.includes("soil") || q.includes("মাটি"))
      return "মাটির উর্বরতা বাড়াতে কম্পোস্ট, গোবর সার, সবুজ সার ও মালচিং ব্যবহার করুন।";

    if (q.includes("pesticide") || q.includes("কীটনাশক"))
      return "জৈব কীটনাশক: নিম তেল স্প্রে, রসুন-মরিচ স্প্রে, সাবান পানি স্প্রে।";

    if (q.includes("water") || q.includes("সেচ"))
      return "সেচের সেরা পদ্ধতি: ড্রিপ সেচ + মালচিং প্রয়োগ করা।";

    return "দয়া করে ফসলের নাম + সমস্যা লিখলে আমি আরও সঠিক পরামর্শ দিতে পারব।";
  };

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = () => {
    if (input.trim() === "") return;

    const userMsg = {
      id: Date.now().toString(),
      sender: "You",
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const reply = {
        id: (Date.now() + 1).toString(),
        sender: "AI",
        text: getAIResponse(userMsg.text),
      };
      setMessages((prev) => [...prev, reply]);
    }, 400);
  };

  /* ---------------- POPULAR QUESTIONS ---------------- */
  const popularQuestions = [
    { title: "ধানের রোগ", description: "ধানের রোগ সনাক্তকরণ ও চিকিৎসা" },
    { title: "সার ব্যবহার", description: "সঠিক সার প্রয়োগ নির্দেশনা" },
    { title: "শীতকালীন সবজি", description: "শীতের জনপ্রিয় সবজি" },
    { title: "মাটির স্বাস্থ্য", description: "মাটি উন্নয়ন পদ্ধতি" },
    { title: "জৈব কীটনাশক", description: "প্রাকৃতিক কীটপতঙ্গ নিয়ন্ত্রণ" },
    { title: "সেচ", description: "সেচের সেরা পদ্ধতি" },
  ];

  /* ---------------- BOTTOM NAV ---------------- */
  const bottomNavItems = [
    { name: "হোম", img: homeIcon, route: "/GuestHome" },
    { name: "পণ্যসমূহ", img: productsIcon, route: "/browse" },
    { name: "শিখুন", img: learnIcon, route: "/LearnArti" },
    { name: "এআই চ্যাট", img: chatIcon, route: "/Ai" },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.container}>
          {/* -------- Header (Moved Up) -------- */}
          <View style={styles.headerContainer}>
            <View style={styles.headerRow}>
              <Image source={robot} style={styles.robotImage} />
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerTitle}>এআই কৃষি সহকারী</Text>
                <Text style={styles.headerSubtitle}>
                  কৃষিকাজ সম্পর্কে কিছু জিজ্ঞাসা করুন
                </Text>
              </View>
            </View>
          </View>

          {/* -------- Chat Box -------- */}
          <View style={styles.chatContainer}>
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.msgRow,
                    item.sender === "You" ? styles.userRow : styles.aiRow,
                  ]}
                >
                  {item.sender === "AI" && (
                    <View style={styles.aiAvatar}>
                      <Text style={styles.aiAvatarText}>AI</Text>
                    </View>
                  )}

                  <View
                    style={[
                      styles.msgBubble,
                      item.sender === "You"
                        ? styles.userBubble
                        : styles.aiBubble,
                    ]}
                  >
                    <Text style={styles.msgText}>{item.text}</Text>
                  </View>
                </View>
              )}
            />
          </View>

          {/* -------- Popular Questions -------- */}
          <ScrollView style={styles.popularContainer}>
            <Text style={styles.popularTitle}>জনপ্রিয় প্রশ্নসমূহ</Text>

            {popularQuestions.map((q, i) => (
              <TouchableOpacity
                key={i}
                style={styles.questionCard}
                onPress={() => setInput(q.title)}
              >
                <Text style={styles.questionTitle}>{q.title}</Text>
                <Text style={styles.questionDesc}>{q.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* -------- Input Row -------- */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="আপনার প্রশ্ন টাইপ করুন..."
              value={input}
              onChangeText={setInput}
              multiline
            />

            <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
              <Text style={styles.sendBtnTxt}>পাঠান</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* -------- Bottom Navigation -------- */}
      <View style={styles.bottomNav}>
        {bottomNavItems.map((item, idx) => {
          const active = activeNav === item.name;
          return (
            <TouchableOpacity
              key={idx}
              style={[styles.navItem, active && styles.activeNav]}
              onPress={() => {
                setActiveNav(item.name);
                router.push(item.route);
              }}
            >
              <Image source={item.img} style={styles.navIcon} />
              <Text style={[styles.navTxt, active && styles.activeNavTxt]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

/* ===========================================================
                     STYLES (UPDATED)
   =========================================================== */
const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: { 
    flex: 1, 
    paddingHorizontal: 15,
    paddingTop: 10, // Reduced top padding
    paddingBottom: 0,
  },

  // Header Container with negative margin to move it up
  headerContainer: {
    marginTop: -55, // Move header up
    marginBottom: 10,
  },
  headerRow: { 
    flexDirection: "row", 
    alignItems: "center", 
  },
  robotImage: { 
    width: 40, 
    height: 40, 
    marginRight: 12 
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#333" 
  },
  headerSubtitle: { 
    fontSize: 14, 
    color: "#666", 
    marginTop: 2 
  },

  chatContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },

  msgRow: { marginVertical: 6 },
  aiRow: { flexDirection: "row" },
  userRow: { flexDirection: "row-reverse" },

  aiAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#28a745",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  aiAvatarText: { color: "#fff", fontWeight: "bold" },

  msgBubble: {
    padding: 12,
    borderRadius: 12,
    maxWidth: "75%",
  },
  aiBubble: { backgroundColor: "#eaf8ea" },
  userBubble: { backgroundColor: "#d1ecf1" },
  msgText: { fontSize: 15 },

  popularContainer: { 
    maxHeight: 180, 
    marginBottom: 10 
  },
  popularTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 10, 
    color: "#333" 
  },

  questionCard: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 10,
  },
  questionTitle: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "#333" 
  },
  questionDesc: { 
    color: "#666", 
    fontSize: 14, 
    marginTop: 2 
  },

  inputContainer: { 
    flexDirection: "row", 
    marginBottom: 10 
  },
  input: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    minHeight: 45,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  sendBtn: {
    marginLeft: 10,
    backgroundColor: "#28a745",
    paddingHorizontal: 18,
    justifyContent: "center",
    borderRadius: 10,
  },
  sendBtnTxt: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 
  },

  bottomNav: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  navItem: { 
    flex: 1, 
    alignItems: "center",
    paddingVertical: 4,
  },
  navIcon: { 
    width: 22, 
    height: 22, 
    marginBottom: 4 
  },
  navTxt: { 
    fontSize: 12, 
    color: "#666" 
  },

  activeNav: {
    backgroundColor: "#eaf8ea",
    borderRadius: 10,
    paddingVertical: 5,
  },
  activeNavTxt: { 
    color: "#28a745", 
    fontWeight: "bold" 
  },
});