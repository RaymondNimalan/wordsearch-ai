import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Tabs } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

type Props = {};

const TabLayout: React.FC = () => {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust for iOS and Android
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // Adjust this value as necessary
        >
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: { position: 'absolute' },
                    tabBarHideOnKeyboard: true,
                }}
            >
                <Tabs.Screen
                    name='index'
                    options={{
                        title: 'Play',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon
                                name={focused ? 'home' : 'home-outline'}
                                color={'#20b42acf6'}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='settings'
                    options={{
                        title: 'Explore',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon
                                name={
                                    focused
                                        ? 'code-slash'
                                        : 'code-slash-outline'
                                }
                                color={color}
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
