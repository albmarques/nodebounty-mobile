import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { darkTheme } from '../../styles/global.js'; // Importa o tema Dark
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { Button } from '../../components/Button'; // Reusable Button component
import StylizedButton from '../../components/StylizedButton.js';

export default function Settings({ navigation }) {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    console.log('User logged out');
    await logout(); // Chama a função de logout do contexto
    // Redireciona para a tela de Login após logout
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={darkTheme.backgroundPrimary} barStyle="light-content" />
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.bntContaier}>
        <StylizedButton text='Dados Pessoais' icon='account-circle' onPress={() => navigation.navigate(`DadosPessoais`)} />
        <StylizedButton text='Sair' icon='logout' onPress={handleLogout} />
      </View>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundPrimary,
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: darkTheme.textPrimary,
  },
  bntContaier: {
    marginTop: 20,
    backgroundColor: darkTheme.backgroundSecondary,
    padding: 10,
    borderRadius: 10,
  },
});