import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../libs/api.js';

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [authIsLoading, setAuthIsLoading] = useState(false);

  useEffect(() => {
    async function retrieveToken() {
      setAuthIsLoading(true);
      const storedToken = await AsyncStorage.getItem('node-bounty');
      if (storedToken) {
        setToken(storedToken);
        api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
      }
      setAuthIsLoading(false);
    }
    retrieveToken();
  }, []);

  async function saveToken(token) {
    await AsyncStorage.setItem('node-bounty', token);
    setToken(token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  async function logout() {
    await AsyncStorage.removeItem('node-bounty');
    setToken(null);
    api.defaults.headers.common.Authorization = null;
  }

  return (
    <AuthContext.Provider value={{ token, authIsLoading, saveToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
