import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { darkTheme } from '../../styles/global.js'; // Importa o tema Dark
import { AuthContext } from '../../contexts/AuthContext.jsx';

import { Button } from '../../components/Button'; // Reusable Button component

export default function Settings({ navigation }) {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    console.log('User logged out');
    logout(); // Chama a função de logout do contexto
    navigation.navigate('Login'); // Redireciona para a tela de Login após logout
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

   

      {/* Logout Button */}
      <View style={styles.option}>
        <Button titulo="Sair" onPress={handleLogout} color={darkTheme.secondary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: darkTheme.background, // Fundo da tela
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: darkTheme.text, // Texto do título
  },
  option: {
    marginBottom: 15,
  },
  optionText: {
    fontSize: 18,
    marginBottom: 5,
    color: darkTheme.text, // Texto das opções
  },
});
