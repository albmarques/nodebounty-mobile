import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons'; // Corrigido aqui

import CreditCard from '../private/CreditCard.jsx';
import HomeScreenPrivate from '../private/HomeScreen.js';
import Settings from '../private/Settings.jsx';
import Plans from '../private/Plans.jsx';
import Wallet from "../private/Wallet.jsx"


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


// Tab Navigator for Private Routes
export default function PrivateRoutes() {

    return (
        <RootStack />
    );
}

function RootStack() {
    return (
        <Stack.Navigator initialRouteName='Plans'
            screenOptions={{
                headerTransparent: true,
                headerTitle: '',
            }}
        >
            <Stack.Screen name="RootTabs"
                component={RootTabs}
                // options={{
                //     headerTransparent: true,
                //     title: '',
                // }}
            />
            <Stack.Screen name="Plans"
                component={Plans}
                // options={{
                //     headerTransparent: true,
                //     title: '',
                // }}
            />
        </Stack.Navigator>
    )
}

function RootTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Cards') {
                        iconName = 'credit-card';
                    } else if (route.name === 'Wallet') {
                        iconName = 'wallet';
                    } else if (route.name === 'Settings') {
                        iconName = 'cog';
                    }
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#078A83',
                tabBarInactiveTintColor: '#FFFFFF',
                tabBarStyle: {
                    backgroundColor: '#252A2D',
                    borderTopWidth: 0,
                },
                headerTransparent: true,
                headerTitle: '',
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreenPrivate}
                options={{ title: '' }}
            />
            <Tab.Screen
                name="Cards"
                component={CreditCard}
                options={{ title: '' }}
            />
            <Tab.Screen
                name="Wallet"
                component={Wallet}
                options={{ title: '' }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{ title: '' }}
            />
        </Tab.Navigator>
    )
}