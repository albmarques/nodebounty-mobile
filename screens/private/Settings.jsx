import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { darkTheme } from '../../styles/global.js'; // Importa o tema Dark
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { Button } from '../../components/Button'; // Reusable Button component

export default function Settings({ navigation }) {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    console.log('User logged out');
    await logout(); // Chama a função de logout do contexto
     // Redireciona para a tela de Login após logout
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
    backgroundColor: darkTheme.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: darkTheme.primary,
    marginBottom: 20,
  },
  option: {
    marginVertical: 10,
  },
});