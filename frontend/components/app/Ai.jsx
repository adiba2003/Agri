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
  const [activeNav, setActiveNav] = useState("AI Chat");
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
              text: "Hello! I am your AI agriculture assistant. Ask anything about farming."
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
      return "Rice diseases: Blast, Blight, Brown spot. Use neem oil + Trichoderma.";

    if (q.includes("fertilizer") || q.includes("সার"))
      return "Use NPK 20-10-10 early stage, potash during flowering.";

    if (q.includes("vegetable") || q.includes("সবজি"))
      return "Best winter vegetables: carrot, cabbage, cauliflower, spinach.";

    if (q.includes("soil") || q.includes("মাটি"))
      return "Use compost, cow dung manure, green manure, mulching to improve soil.";

    if (q.includes("pesticide") || q.includes("কীটনাশক"))
      return "Organic pesticides: Neem oil spray, garlic–chili spray.";

    if (q.includes("water") || q.includes("সেচ"))
      return "Best irrigation: drip irrigation + mulching.";

    return "Please mention the crop name + problem for accurate advice.";
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
    { title: "Rice Diseases", description: "Identify and treat rice diseases" },
    { title: "Fertilizer Usage", description: "Correct fertilizer application" },
    { title: "Winter Vegetables", description: "Best winter crops" },
    { title: "Soil Health", description: "Improve soil fertility" },
    { title: "Organic Pesticides", description: "Natural pest control" },
    { title: "Irrigation", description: "Best watering methods" },
  ];

  /* ---------------- BOTTOM NAV ---------------- */
  const bottomNavItems = [
    { name: "Home", img: homeIcon, route: "/GuestHome" },
    { name: "Products", img: productsIcon, route: "/browse" },
    { name: "Learn", img: learnIcon, route: "/LearnArti" },
    { name: "AI Chat", img: chatIcon, route: "/Ai" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>


          {/* -------- Header -------- */}
          <View style={styles.headerRow}>
            <Image source={robot} style={styles.robotImage} />
            <View>
              <Text style={styles.headerTitle}>AI Agriculture Assistant</Text>
              <Text style={styles.headerSubtitle}>Ask anything about farming</Text>
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
          <ScrollView style={{ maxHeight: 180 }}>
            <Text style={styles.popularTitle}>Popular Questions</Text>

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
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Type your question..."
              value={input}
              onChangeText={setInput}
              multiline
            />

            <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
              <Text style={styles.sendBtnTxt}>Send</Text>
            </TouchableOpacity>
          </View>


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

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ===========================================================
                     STYLES (FULL + ERROR FREE)
   =========================================================== */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 15 },

  headerRow: { flexDirection: "row", marginBottom: 10 },
  robotImage: { width: 50, height: 50, marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  headerSubtitle: { color: "#666" },

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

  popularTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },

  questionCard: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 10,
  },
  questionTitle: { fontSize: 16, fontWeight: "600" },
  questionDesc: { color: "#666" },

  inputRow: { flexDirection: "row", marginTop: 10 },
  input: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    minHeight: 45,
  },
  sendBtn: {
    marginLeft: 10,
    backgroundColor: "#28a745",
    paddingHorizontal: 18,
    justifyContent: "center",
    borderRadius: 10,
  },
  sendBtnTxt: { color: "#fff", fontWeight: "bold" },

  bottomNav: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    marginTop: 10,
  },
  navItem: { flex: 1, alignItems: "center" },
  navIcon: { width: 22, height: 22, marginBottom: 4 },
  navTxt: { fontSize: 12 },

  activeNav: {
    backgroundColor: "#eaf8ea",
    borderRadius: 10,
    paddingVertical: 5,
  },
  activeNavTxt: { color: "#28a745", fontWeight: "bold" },
});
