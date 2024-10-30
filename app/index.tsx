import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home: React.FC = () => {
    const router = useRouter();
    return (
        <SafeAreaView>
            <View className='justify-ceneter items-center'>
                <Text>Welcome to Word Sleuth</Text>
                <Button
                    className='bg-blue-300 h-[30px] '
                    onPress={() => router.push('/(tabs)')}
                >
                    <Text>Play a Game!</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
};

export default Home;
