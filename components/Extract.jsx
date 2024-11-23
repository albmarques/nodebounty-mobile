import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { api } from '../libs/api.js';
import { UnitExtract } from './UnitExtract.js';

export function Extract() {
  const [dadosTransacao, setDadosTransacao] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await api.get('/transacoes');
        setDadosTransacao(data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as transações.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4285F4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Extrato</Text>
      <View style={styles.flatListContainer}>
        <FlatList
          data={dadosTransacao}
          keyExtractor={(item, index) => String(item.id || `key-${index}`)}
          renderItem={({ item }) => (
            <UnitExtract data={item} owner={123 /* Exemplo de ID */} />
          )}
          ListEmptyComponent={() => (
            <Text style={styles.alert}>Não há histórico de transações realizadas.</Text>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  flatListContainer: {
    height: 200,  // Definindo uma altura fixa para o FlatList
    marginTop: 20,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  alert: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});
