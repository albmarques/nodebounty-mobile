import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { darkTheme } from '../../styles/global.js';
import HomeScreen from '../public/HomeScreen.jsx';
import LoginScreen from '../public/LoginScreen.jsx';
import SignUp from '../public/Sign-up.jsx';

const Stack = createDrawerNavigator();

// Public Routes
export default function PublicRoutes() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#2C3336',
                },
                drawerActiveTintColor: '#07b0f2',
                drawerInactiveTintColor: '#FFFFFF',
                drawerActiveBackgroundColor: '#213238',
                drawerInactiveBackgroundColor: '#2C3336',
                headerStyle: {
                    backgroundColor: darkTheme.background,
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Cadastrar" component={SignUp} />
        </Stack.Navigator>
    );
}