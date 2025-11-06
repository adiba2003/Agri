import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image } from 'expo-image';
export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarStyle: {
                    backgroundColor: Colors[colorScheme ?? 'light'].background,
                },
                tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].text,
                tabBarItemStyle: {
                    height: 56,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                },
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                }}
            />
            <Tabs.Screen
                name="smart-farming"
                options={{
                    title: 'Smart Farming',
                    tabBarIcon: ({ color }) => <Image source={require('@/assets/rice.png')} style={{ width: 28, height: 28 }} />,
                }}
            />
            <Tabs.Screen
                name="direct-sales"
                options={{
                    title: 'Direct Sales',
                    tabBarIcon: ({ color }) => <Image source={require('@/assets/hand.webp')} style={{ width: 28, height: 28 }} />,
                }}
            />
            <Tabs.Screen
                name="ai-assistant"
                options={{
                    title: 'AI Assistant',
                    tabBarIcon: ({ color }) => <Image source={require('@/assets/robot.png')} style={{ width: 28, height: 28 }} />,
                }}
            />
        </Tabs>
    );
}
