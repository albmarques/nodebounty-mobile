import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { darkTheme } from './styles/global.js';
import { AuthContextProvider, AuthContext } from './contexts/AuthContext.jsx';
import { MaterialCommunityIcons } from 'react-native-vector-icons'; // Corrigido aqui

import Settings from './screens/private/Settings.jsx';
import HomeScreenPrivate from './screens/private/HomeScreen.js';
import Plans from './screens/private/Plans.jsx'; // Tela de planos
import HomeScreen from './screens/public/HomeScreen.jsx';
import LoginScreen from './screens/public/LoginScreen.jsx';
import SignUp from './screens/public/Sign-up.jsx';

// Create navigators
const Tab = createBottomTabNavigator(); // For private navigation
const Stack = createStackNavigator(); // For Plans navigation
const Drawer = createDrawerNavigator(); // For public navigation

// Public Routes
function PublicRoutes() {
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

// Tab Navigator for Private Routes
function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Cards') {
            iconName = 'credit-card';
          } else if (route.name === 'Wallet') {
            iconName = 'wallet';
          } else if (route.name === 'Config') {
            iconName = 'settings';
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
      <Tab.Screen name="Home" component={HomeScreenPrivate} />
      <Tab.Screen name="Cards" component={Settings} />
      <Tab.Screen name="Wallet" component={Settings} />
      <Tab.Screen name="Config" component={Settings} />
    </Tab.Navigator>
  );
}

// Stack Navigator to isolate Plans
function PrivateRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Plans"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#252A2D',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {/* Main Tabs */}
      <Stack.Screen
        name="MainTabs"
        component={TabRoutes}
        options={{ headerShown: false }} // Hide header for tabs
      />
      {/* Plans */}
      <Stack.Screen
        name="Plans"
        component={Plans} // Agora está correto
        options={{
          title: 'Planos',
        }}
      />
    </Stack.Navigator>
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
  const { token } = useContext(AuthContext); // Access token from context
  return token ? <PrivateRoutes /> : <PublicRoutes />; // Conditional rendering based on token
}
