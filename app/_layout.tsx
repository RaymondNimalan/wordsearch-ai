import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { GameProvider } from '@/context/GameProvider';
import '@/global.css';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const height = Dimensions.get('window').height;

export default function RootLayout() {
    const [windowHeight, setWindowHeight] = useState(height);

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            'change',
            ({ window }) => {
                setWindowHeight(window.height);
            }
        );

        return () => {
            subscription?.remove();
        };
    }, []);
    return (
        <GestureHandlerRootView className='flex-1'>
            <GluestackUIProvider mode='light'>
                <SafeAreaProvider>
                    <GameProvider>
                        <Stack
                            screenOptions={{
                                headerStyle: {
                                    backgroundColor: '#f4511e',
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                            }}
                        >
                            <Stack.Screen
                                name='index'
                                // options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name='(tabs)'
                                options={{ headerShown: false }}
                            />
                        </Stack>
                    </GameProvider>
                </SafeAreaProvider>
            </GluestackUIProvider>
        </GestureHandlerRootView>
    );
}
