import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext.jsx';

export default function Dashboard() {
  const { token, logout } = useContext(AuthContext); // Obtém o token e o método logout do contexto

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      {token ? (
        <Text style={styles.token}>Token atual: {token}</Text>
      ) : (
        <Text style={styles.token}>Nenhum token encontrado</Text>
      )}
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  token: {
    fontSize: 16,
    marginBottom: 16,
  },
});
