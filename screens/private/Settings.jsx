import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { darkTheme } from '../../styles/global.js'; // Importa o tema Dark
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { Button } from '../../components/Button'; // Reusable Button component
import StylizedButton from '../../components/StylizedButton';
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
         <StylizedButton
            text="Sair"
            onPress={handleLogout}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundPrimary,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: darkTheme.primary,
    marginBottom: 20,
  },
  option: {
    justifyContent:"center",
    textAlign:"center",
    marginVertical: 10,
  },
});