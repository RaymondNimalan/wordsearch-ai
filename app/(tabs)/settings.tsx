import { Input, InputField } from '@/components/ui/input';
import {
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
} from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const androidURL = 'http://192.168.1.161:5000/api/generate';
const webURL = 'http://127.0.0.1:5000/api/generate';

const height = Dimensions.get('window').height;

const Settings: React.FC = () => {
    const [gameData, setGameData] = useState();
    const [random, setRandom] = useState(true);
    const [topic, setTopic] = useState('');
    const tabBarHeight = useBottomTabBarHeight();
    console.log(height);

    const getGameData = async () => {
        console.log('in fetch request');
        try {
            const response = await fetch(
                'http://192.168.1.161:5001/api/generate',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        settings: {
                            topic: 'pizza toppings',
                            wordLength: 'short',
                            numberOfWords: 10,
                        },
                    }),
                }
            );
            console.log('after fetch request');
            if (response) {
                console.log('RESPONSE', response);
                const data = await response.json();
                console.log('data', data);
                if (data) {
                    console.log('response', data);
                    const gameObject = await JSON.parse(data);
                    setGameData(gameObject);
                    return gameObject;
                }
            }
        } catch (error) {
            console.error('Error fetching words:', error);
        }
    };

    const handleButtonClick = () => {
        getGameData();
    };

    // useEffect(() => {
    //     getGameData();
    // }, []);

    useEffect(() => {
        console.log('game data:', gameData);
    }, [gameData]);

    useEffect(() => {
        console.log('topic', topic);
    }, [topic]);

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
        <SafeAreaView>
            <ScrollView
            // contentContainerStyle={
            //     {
            //         flexGrow: 1,
            //         paddingBottom: tabBarHeight,
            //     }
            // }
            >
                <KeyboardAvoidingView
                    className='flex-1'
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View
                        className='bg-black items-center'
                        style={{
                            paddingBottom: tabBarHeight,
                            height: windowHeight,
                        }}
                    >
                        <Text size='3xl' className='text-white py-4'>
                            Settings
                        </Text>
                        <View className='bg-slate-800 w-[90%] rounded-2xl'>
                            <View className='flex flex-row justify-between m-4'>
                                <View className='w-[25%] aspect-square bg-red-200 rounded-xl'></View>
                                <View className='w-[25%] aspect-square bg-red-200 rounded-xl'></View>
                                <View className='w-[25%] aspect-square border-blue-600 border rounded-xl justify-between items-center bg-slate-400'>
                                    <Text size='xl' className='text-white'>
                                        Random Topic
                                    </Text>
                                    <Switch
                                        size='lg'
                                        isDisabled={false}
                                        onToggle={() => setRandom(!random)}
                                    />
                                </View>
                            </View>

                            <View className='h-[15%] border-blue-600 border flex-row justify-between items-center'>
                                <Text className='text-white'>
                                    Choose a Topic
                                </Text>

                                <Input className='w-40'>
                                    <InputField
                                        onChangeText={(e) => setTopic(e)}
                                    />
                                </Input>
                            </View>
                            <View className='h-[15%] border-blue-600 border justify-between'>
                                <Text className='text-white'>Word Amount</Text>
                                <Slider minValue={0} maxValue={10}>
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb />
                                </Slider>
                            </View>
                        </View>
                        {/* <View className='w-[80%] h-[30%] bg-purple-500 rounded-2xl items-center justify-center'>
                            <Text>Generate Game</Text>
                        </View> */}
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default Settings;

{
    /* <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#0056b3' : '#007BFF', // Change color when pressed
                        },
                        styles.button,
                    ]}
                    onPress={handleButtonClick}
                >
                    <Text style={styles.buttonText}>Click Me</Text>
                </Pressable> */
}
