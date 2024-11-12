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
import { Image, Text, View } from 'react-native';
import { ArrowDownCircle, ArrowUpCircle } from 'react-native-feather';
import WordSearch from './WordSearch';
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
            <View className='flex-1 items-center bg-yellow-200'>
                <Image
                    source={require('../../assets/images/findwords-logo.png')}
                    style={{ width: 400, height: 160 }}
                    className='my-4'
                />

                <WordSearch />
                <Button className='border-2 my-4'>
                    <ArrowUpCircle
                        stroke='red'
                        fill='#fff'
                        width={32}
                        height={32}
                        onPress={() => {
                            setShowDrawer(true);
                        }}
                    />
                </Button>
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
                            <ArrowDownCircle
                                stroke='red'
                                fill='#fff'
                                width={32}
                                height={32}
                            />

                            <Text>Button</Text>
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default WordSearchScreen;
