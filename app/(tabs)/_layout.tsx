import { Tabs } from "expo-router";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image } from "expo-image";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,                 // উপরের default header off
        tabBarStyle: { display: "none" },   // ⬅️ নিচের পুরো tab bar hide
        tabBarShowLabel: false,            // label গুলোও hide
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          // tab bar দেখাচ্ছি না, কিন্তু future-proof রাখতে icon রেখে দিলাম
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="smart-farming"
        options={{
          title: "Smart Farming",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/rice.png")}
              style={{ width: 28, height: 28 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="direct-sales"
        options={{
          title: "Direct Sales",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/hand.webp")}
              style={{ width: 28, height: 28 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ai-assistant"
        options={{
          title: "AI Assistant",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/robot.png")}
              style={{ width: 28, height: 28 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
