import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons'; // Corrigido aqui

import HomeScreenPrivate from '../private/HomeScreen.js';
import Settings from '../private/Settings.jsx';
import Plans from '../private/Plans.jsx';
import CreditCard from '../private/CreditCard.jsx';
import Wallet from '../private/Wallet.jsx';
import Deposito from '../private/Deposito.jsx';
import Saque from '../private/Saque.jsx';
import Transfer from '../private/Transfer.jsx';
import { darkTheme } from '../../styles/global.js';
import DadosPessoais from '../private/DadosPessoais.jsx';
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
                headerTintColor: darkTheme.textPrimary
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
            initialRouteName='Home'
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
                component={HomeStack}
                options={{ title: '' }}
            />
            <Tab.Screen
                name="Cards"
                component={CreditCard}
                options={{ title: '' }}
            />
            <Tab.Screen
                name="Wallet"
                component={WalletStack}
                options={{ title: '' }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsStack}
                options={{ title: '' }}
            />
        </Tab.Navigator>
    )
}

function HomeStack() {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerTransparent: true,
                headerTintColor: darkTheme.textPrimary
            }}
        >
            <Stack.Screen name="Home"
                component={HomeScreenPrivate}
                options={{
                    title: ''
                }}
            />
            <Stack.Screen name="Transfer"
                component={Transfer}
                options={{
                    title: 'TRANSFERIR'
                }}
            />
        </Stack.Navigator>
    )
}

function WalletStack() {
    return (
        <Stack.Navigator
            initialRouteName='Wallet'
            screenOptions={{
                headerTransparent: true,
                headerTintColor: darkTheme.textPrimary
            }}
        >
            <Stack.Screen name="Wallet"
                component={Wallet}
                options={{
                    title: ''
                }}
            />
            <Stack.Screen name="Deposito"
                component={Deposito}
                options={{
                    title: 'DEPOSITAR'
                }}
            />
            <Stack.Screen name="Saque"
                component={Saque}
                options={{
                    title: 'SACAR'
                }}
            />
            <Stack.Screen name="Transfer"
                component={Transfer}
                options={{
                    title: 'TRANSFERIR'
                }}
            />
        </Stack.Navigator>
    )
}

function SettingsStack() {
    return (
        <Stack.Navigator
            initialRouteName='Settings'
            screenOptions={{
                headerTransparent: true,
                headerTintColor: darkTheme.textPrimary
            }}
        >
            <Stack.Screen name="Settings"
                component={Settings}
                options={{
                    title: ''
                }}
            />
            <Stack.Screen name="DadosPessoais"
                component={DadosPessoais}
                options={{
                    title: 'Dados Pessoais'
                }}
            />
        </Stack.Navigator>
    )
}