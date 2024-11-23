import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';

import { darkTheme } from '../../styles/global.js'; // Importa o tema desejado
import StylizedButton from '../../components/StylizedButton.js';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={darkTheme.backgroundPrimary} barStyle='light-content' />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo/Logo.png')} style={styles.logo} />
        </View>
        <View style={styles.authContainer}>
          <StylizedButton icon='login' text='ENTRAR' onPress={() => navigation.navigate('Login')} />
          <StylizedButton icon='add-circle-outline' text='ABRIR UMA CONTA' onPress={() => navigation.navigate('Cadastrar')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: darkTheme.backgroundPrimary,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  authContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    backgroundColor: darkTheme.backgroundSecondary,
  },
});
