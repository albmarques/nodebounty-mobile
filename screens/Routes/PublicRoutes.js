import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { darkTheme } from '../../styles/global.js';
import HomeScreen from '../public/HomeScreen.jsx';
import LoginScreen from '../public/LoginScreen.jsx';
import SignUp from '../public/Sign-up.jsx';

const Drawer = createDrawerNavigator();

// Public Routes
export default function PublicRoutes() {
    return (
        <Drawer.Navigator
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
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="Cadastrar" component={SignUp} />
        </Drawer.Navigator>
    );
}