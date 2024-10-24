import WordSearch from '@/components/play/WordSearch';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';

const WordSearchScreen: React.FC = () => {
    return (
        <SafeAreaView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text style={{ fontSize: 24, marginBottom: 20 }}>
                Word Search Game
            </Text>
            <WordSearch />
        </SafeAreaView>
    );
};

export default WordSearchScreen;
