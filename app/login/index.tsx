import { View, Text } from 'react-native'
import React from 'react'
import LoginScreen from '@/components/app/LoginScreen'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
const index = () => {
  return (
   <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title:  'login',
                    headerTitleStyle: {
                        color: 'white',
                        fontSize: 16,
                        fontFamily: 'Inter_700Bold',
                    },
                    headerStyle: {
                        backgroundColor: '#080B30',
                    },
                    headerTintColor: '#fff',
                    animation: 'slide_from_right',
                }} />
            <SafeAreaView >
                <LoginScreen/>
            </SafeAreaView>
        </>
  )
}

export default index