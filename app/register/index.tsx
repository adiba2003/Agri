import RegisterScreen from '@/components/app/RegisterScreen';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const index = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: 'Register',
                    headerTitleStyle: {
                        color: 'white',
                        fontSize: 16,
                        fontFamily: 'Inter_700Bold',
                    },
                    headerStyle: {
                        backgroundColor: '#28a745',
                    },
                    headerTintColor: '#fff',
                    animation: 'slide_from_right',
                }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <RegisterScreen />
            </SafeAreaView>
        </>
    )
}

export default index
