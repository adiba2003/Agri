import HomeScreen from "@/components/app/HomeScreen";
import { ScrollView, StyleSheet } from 'react-native';


export default function Home() {
    return (
        <ScrollView style={styles.screen} contentContainerStyle={{ flexGrow: 1 }}>
            <HomeScreen></HomeScreen>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },
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
