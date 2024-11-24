import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, ToastAndroid } from 'react-native';
import { api } from '../libs/api.js';
export function Withdraw() {
  const [dadosConta, setDadosConta] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [valor, setValor] = useState('');

  const loadAccountData = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('/conta');
      setDadosConta(data);
      setIsLoading(false);
    } catch {
      ToastAndroid.show('Erro ao carregar dados da conta', ToastAndroid.LONG);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAccountData();
  }, [loadAccountData]);

  const handleInputChange = (text) => {
    const numericValue = parseFloat(text.replace(/\D/g, '') / 100).toFixed(2);
    setValor(numericValue || '');
  };

  const handleSacar = async () => {
    const numericValue = parseFloat(valor);

    if (!numericValue || numericValue < 0.01) {
      ToastAndroid.show('O valor mínimo para saque é de 1 centavo.', ToastAndroid.LONG);
      return;
    }

    if (numericValue > (dadosConta.saldoConta || 0)) {
      ToastAndroid.show(
        `O valor máximo de saque é de ${dadosConta.saldoConta?.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}.`,
        ToastAndroid.LONG
      );
      return;
    }

    try {
      const response = await api.post('/transacoes/sacar', { valor: numericValue });

      if (response.status === 200) {
        ToastAndroid.show('Saque realizado com sucesso!', ToastAndroid.LONG);
        loadAccountData();
        setValor('');
      } else {
        ToastAndroid.show('Erro ao sacar. Por favor, tente novamente.', ToastAndroid.LONG);
      }
    } catch {
      ToastAndroid.show('Erro ao sacar. Por favor, tente novamente.', ToastAndroid.LONG);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sacar</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Saldo:</Text>
        <Text style={styles.balance}>
          {dadosConta.saldoConta?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </Text>
      </View>
      <Text style={styles.label}>Informe o valor do saque:</Text>
      <TextInput
        style={styles.input}
        value={`R$ ${valor.replace('.', ',')}`}
        onChangeText={handleInputChange}
        keyboardType="numeric"
        placeholder="R$0,00"
      />
      <Button
        title="Sacar"
        onPress={handleSacar}
        disabled={(dadosConta.saldoConta || 0) === 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  balance: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
  },
});
