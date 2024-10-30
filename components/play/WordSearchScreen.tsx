import WordSearch from '@/components/play/WordSearch';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerBackdrop,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
} from '@/components/ui/drawer';
import { GameContext } from '@/context/GameProvider';
import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ArrowRightCircle } from 'react-native-feather';
import { wordSearchGame } from './wordSearchData';

const words = wordSearchGame.words;

const WordSearchScreen: React.FC = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const {
        wordBank,
        setWordBank,
        foundWords,
        setFoundWords,
        notFoundWords,
        setNotFoundWords,
    } = useContext(GameContext);

    useEffect(() => {
        setWordBank(words);
        setNotFoundWords(words);
        console.log('word bank:', wordBank);
    }, []);

    useEffect(() => {
        console.log('wordBank from screen', wordBank);
    }, [wordBank]);
    useEffect(() => {
        console.log('foundWords from screen', foundWords);
    }, [foundWords]);

    return (
        <>
            <View className='flex-1 justify-center items-center'>
                <Text style={{ fontSize: 24, marginBottom: 20 }}>
                    Word Search Game
                </Text>
                <Button className='border-2'>
                    <ArrowRightCircle
                        stroke='red'
                        fill='#fff'
                        width={32}
                        height={32}
                        onPress={() => {
                            setShowDrawer(true);
                        }}
                    />
                </Button>
                <WordSearch />
            </View>
            <Drawer
                isOpen={showDrawer}
                onClose={() => {
                    setShowDrawer(false);
                }}
                size='sm'
                anchor='bottom'
            >
                <DrawerBackdrop />
                <DrawerContent>
                    <DrawerHeader>
                        <Text>Words</Text>
                    </DrawerHeader>
                    <DrawerBody>
                        <View>
                            {foundWords && foundWords.length !== 0 ? (
                                foundWords.map((word, index) => (
                                    <Text key={index}>{word}</Text>
                                ))
                            ) : (
                                <Text>no words found</Text>
                            )}
                        </View>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button
                            onPress={() => {
                                setShowDrawer(false);
                            }}
                            className='flex-1'
                        >
                            <Text>Button</Text>
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default WordSearchScreen;
