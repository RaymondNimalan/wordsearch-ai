import { Text } from '@/components/ui/text';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const topThree = [
    { name: 'bob', img: 'img', score: '24' },
    { name: 'sarah', img: 'img', score: '24' },
    { name: 'joe', img: 'img', score: '24' },
];

const leaderboardData = [
    { name: 'bob', img: 'img', score: '24' },
    { name: 'sarah', img: 'img', score: '24' },
    { name: 'joe', img: 'img', score: '24' },
    { name: 'bob', img: 'img', score: '24' },
    { name: 'sarah', img: 'img', score: '24' },
    { name: 'joe', img: 'img', score: '24' },
    { name: 'bob', img: 'img', score: '24' },
    { name: 'sarah', img: 'img', score: '24' },
    { name: 'joe', img: 'img', score: '24' },
];

const Leaderboard: React.FC = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                height: '100%',
                // paddingTop: Platform.OS === 'android' ? 30 : 0,
            }}
        >
            <StatusBar backgroundColor='#facc15' barStyle='dark-content' />
            <View className='absolute w-[150%] aspect-square bg-yellow-200 rounded-b-full z-0 translate-y-24'></View>
            <View className='relative w-full items-center z-10 bg-yellow-200'>
                <Text size='6xl' className='pb-8 pt-16'>
                    Title
                </Text>
                <View className='items-center w-[80%] p-4'>
                    <Text size='2xl' bold={true}>
                        Leaderboard
                    </Text>
                    {/* top 3 leader board containter */}
                    <View className='flex-row justify-between w-full py-4'>
                        {topThree.map((leader, index) => (
                            <View
                                className='bg-yellow-500 p-4 w-20 items-center border border-black shadow-lg'
                                key={index}
                            >
                                <Text>{leader.name}</Text>
                                <Text>{leader.img}</Text>
                                <Text>{leader.score}</Text>
                            </View>
                        ))}
                    </View>
                    {/* remaining leaderboard container */}
                    <View className='gap-4 w-full'>
                        {topThree.map((user, index) => (
                            <View
                                className='bg-yellow-500 h-12 rounded-full w-full items-center flex-row p-2 justify-between shadow-lg'
                                key={index}
                            >
                                <View className='flex-row items-center'>
                                    <View className='rounded-full aspect-square h-full bg-white items-center justify-center mr-4'>
                                        <Text>{index}</Text>
                                    </View>

                                    <Text>{user.name}</Text>
                                </View>

                                <Text className='mr-4' bold={true}>
                                    {user.score}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Leaderboard;
