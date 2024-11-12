import { Tabs } from 'expo-router';
import React from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';

type Props = {};

const TabLayout: React.FC = () => {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        height: 120,
                        elevation: 0,
                        borderTopWidth: 0,
                        backgroundColor: 'transparent',
                    },
                    tabBarHideOnKeyboard: true,
                }}
            >
                <Tabs.Screen
                    name='leaderboard'
                    options={{
                        title: 'Leaderboard',
                        tabBarIcon: ({ color, focused }) => (
                            // <TabBarIcon
                            //     name={focused ? 'home' : 'home-outline'}
                            //     color={'#20b42acf6'}
                            // />
                            <Image
                                source={
                                    focused
                                        ? require('../../assets/images/leaderboard-icon-focused.png') // Focused state image
                                        : require('../../assets/images/leaderboard-icon.png') // Default image
                                }
                                style={{
                                    width: 75,
                                    height: 75,
                                    // tintColor: color, // Optional, matches the color prop
                                }}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='index'
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            // <TabBarIcon
                            //     name={focused ? 'home' : 'home-outline'}
                            //     color={'#20b42acf6'}
                            //     size={48}
                            // />
                            <Image
                                source={
                                    focused
                                        ? require('../../assets/images/play-icon-focused.png') // Focused state image
                                        : require('../../assets/images/play-icon.png') // Default image
                                }
                                style={{
                                    width: 125,
                                    height: 125,
                                    // tintColor: color, // Optional, matches the color prop
                                }}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='settings'
                    options={{
                        title: 'Explore',
                        tabBarIcon: ({ color, focused }) => (
                            // <TabBarIcon
                            //     name={
                            //         focused
                            //             ? 'code-slash'
                            //             : 'code-slash-outline'
                            //     }
                            //     color={color}
                            // />
                            <Image
                                source={
                                    focused
                                        ? require('../../assets/images/setting-icon-focused.png') // Focused state image
                                        : require('../../assets/images/setting-icon.png') // Default image
                                }
                                style={{
                                    width: 75,
                                    height: 75,
                                    // tintColor: color, // Optional, matches the color prop
                                }}
                            />
                        ),
                    }}
                />
            </Tabs>
        </KeyboardAvoidingView>
    );
};

export default TabLayout;

const styles = StyleSheet.create({});
