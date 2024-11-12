import { Text } from '@/components/ui/text';
import React from 'react';
import { Image, StatusBar, View } from 'react-native';
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
                <View>
                    <Image
                        source={require('../../assets/images/findwords-logo.png')}
                        style={{ width: 400, height: 160 }}
                        className='my-4'
                    />
                </View>

                {/* <Text size='6xl' className='pb-8 pt-16'>
                    Title
                </Text> */}
                <View className='w-[80%]'>
                    <Text size='2xl' bold={true} className='text-black pb-4'>
                        Leaderboard
                    </Text>
                    {/* top 3 leader board containter */}
                    <View className='flex-row justify-between w-full'>
                        {topThree.map((leader, index) => (
                            <View
                                className='pb-4 w-20 items-center'
                                key={index}
                            >
                                <Image
                                    source={require('../../assets/images/person-icon.png')}
                                    style={{ width: 75, height: 60 }}
                                    className=''
                                />
                                <Text bold={true} size='lg'>
                                    {leader.name}
                                </Text>
                                <View className='px-4 rounded-full bg-slate-400'>
                                    <Text className=''>{leader.score}</Text>
                                </View>
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
                                    <View className='rounded-full aspect-square h-full bg-white items-center justify-center'>
                                        <Text>{index}</Text>
                                    </View>

                                    <Text className='ml-4 ' bold={true}>
                                        {user.name}
                                    </Text>
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
