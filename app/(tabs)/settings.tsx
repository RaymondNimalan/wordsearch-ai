import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const androidURL = 'http://192.168.1.161:5000/api/generate';
const webURL = 'http://127.0.0.1:5000/api/generate';

const Settings: React.FC = () => {
    const [gameData, setGameData] = useState();

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

    return (
        <SafeAreaView style={styles.container}>
            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? '#0056b3' : '#007BFF', // Change color when pressed
                    },
                    styles.button,
                ]}
                onPress={handleButtonClick}
            >
                <Text style={styles.buttonText}>Click Me</Text>
            </Pressable>
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
