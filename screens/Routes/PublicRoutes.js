import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { darkTheme } from '../../styles/global.js';
import HomeScreen from '../public/HomeScreen.jsx';
import LoginScreen from '../public/LoginScreen.jsx';
import SignUp from '../public/Sign-up.jsx';

const Stack = createStackNavigator();

// Public Routes
export default function PublicRoutes() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerTransparent: true,
                headerTitle: '',
                headerTintColor: darkTheme.textPrimary,
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Cadastrar" component={SignUp} />
        </Stack.Navigator>
    );
}