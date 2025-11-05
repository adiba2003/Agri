import { Image } from 'expo-image';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import HomeScreen from "@/components/app/HomeScreen"


export default function Home() {
  return (
 <ScrollView>
  <HomeScreen></HomeScreen>
 </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
