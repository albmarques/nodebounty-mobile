import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, ToastAndroid } from 'react-native';
import { api } from '../libs/api.js';

export function Transfer() {
  const [dadosConta, setDadosConta] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [valor, setValor] = useState('');
  const [numeroConta, setNumeroConta] = useState('');

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

  const handleInputChangeValor = (text) => {
    const numericValue = parseFloat(text.replace(/\D/g, '') / 100).toFixed(2);
    setValor(numericValue || '');
  };

  const handleInputChangeConta = (text) => {
    setNumeroConta(text.replace(/\D/g, '')); // Allow only numbers
  };

  const handleTransfer = async () => {
    const numericValue = parseFloat(valor);

    if (!numericValue || numericValue < 0.01) {
      ToastAndroid.show('O valor mínimo para transferência é de 1 centavo.', ToastAndroid.LONG);
      return;
    }

    if (numericValue > (dadosConta.saldoConta || 0)) {
      ToastAndroid.show(
        `O valor da transferência não pode ser maior que o saldo disponível (${dadosConta.saldoConta?.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}).`,
        ToastAndroid.LONG
      );
      return;
    }

    if (numeroConta.length !== 20) {
      ToastAndroid.show('O número da conta deve ter exatamente 20 dígitos.', ToastAndroid.LONG);
      return;
    }

    try {
      const response = await api.post('/transacoes/transferir', { valor: numericValue, numeroConta });

      if (response.status === 200) {
        ToastAndroid.show('Transferência realizada com sucesso!', ToastAndroid.LONG);
        loadAccountData();
        setValor('');
        setNumeroConta('');
      } else {
        ToastAndroid.show('Erro ao transferir. Por favor, tente novamente.', ToastAndroid.LONG);
      }
    } catch {
      ToastAndroid.show('Erro ao transferir. Por favor, tente novamente.', ToastAndroid.LONG);
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
      <Text style={styles.title}>Transferir</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Saldo:</Text>
        <Text style={styles.balance}>
          {dadosConta.saldoConta?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </Text>
      </View>
      <Text style={styles.label}>Valor da transferência:</Text>
      <TextInput
        style={styles.input}
        value={`R$ ${valor.replace('.', ',')}`}
        onChangeText={handleInputChangeValor}
        keyboardType="numeric"
        placeholder="R$0,00"
      />
      <Text style={styles.label}>Número da conta:</Text>
      <TextInput
        style={styles.input}
        value={numeroConta}
        onChangeText={handleInputChangeConta}
        keyboardType="numeric"
        placeholder="Número da conta"
        maxLength={20}
      />
      <Button
        title="Transferir"
        onPress={handleTransfer}
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
