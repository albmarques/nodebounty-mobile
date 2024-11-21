import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContextProvider, AuthContext } from './contexts/AuthContext.jsx';

import PublicRoutes from './screens/Routes/PublicRoutes.js';
import PrivateRoutes from './screens/Routes/PrivateRoutes.js';

// Create navigators

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
