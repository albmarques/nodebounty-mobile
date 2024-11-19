import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Import Stack Navigator
import { createDrawerNavigator } from '@react-navigation/drawer'; // Import Drawer Navigator

import { AuthContextProvider, AuthContext } from './contexts/AuthContext.jsx';

import Dashboard from './screens/private/Dashboard.jsx';
import Settings from './screens/private/Settings.jsx';
import HomeScreen from './screens/public/HomeScreen.jsx';
import LoginScreen from './screens/public/LoginScreen.jsx';
import SignUp from './screens/public/Sign-up.jsx';
import HomeScreenPrivate from './screens/private/HomeScreen.js';

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // For public routes
const Drawer = createDrawerNavigator(); // For public routes with the hamburger menu

// Public Routes (for unauthenticated users) with Drawer Navigation
function PublicRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Cadastrar" component={SignUp} />
    </Drawer.Navigator>
  );
}

// Private Routes (for authenticated users) with Bottom Tab Navigation
function PrivateRoutes() {
  return (
    <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home-filled';
            } if (route.name === 'Cards') {
              iconName = 'credit-card';
            } if (route.name === 'Wallet') {
              iconName = 'wallet';
            } if (route.name === 'Config') {
              iconName = 'settings';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#078A83',
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarStyle: {
            backgroundColor: '#252A2D',
            borderTopWidth: 0,
          },
          tabBarIconStyle: {
            size: 40,
          },
          headerTransparent: true,
          headerTitle: '',

        })}
      >
        <Tab.Screen name="Home"
          options={{
            title: '',
          }}
          component={HomeScreenPrivate}
        />
        <Tab.Screen name="Cards"
          options={{
            title: '',
          }}
          component={Dashboard}
        />
        <Tab.Screen name="Wallet"
          options={{
            title: '',
          }}
          component={Settings}
        />
        <Tab.Screen name="Config"
          options={{
            title: '',
          }}
          component={HomeScreen}
        />
      </Tab.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthContextProvider>
  );
}

// Managing routes based on authentication state
function Routes() {
  const { token } = useContext(AuthContext);  // Access token from context
  return token ? <PrivateRoutes /> : <PublicRoutes />; // Conditional rendering based on token
}
