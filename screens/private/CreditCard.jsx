import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator, ToastAndroid, Platform, SafeAreaView, ScrollView } from 'react-native';
import { api } from '../../libs/api.js';
import StylizedButton from '../../components/StylizedButton';
import CreditCardItem from "../../components/CreditCardItem"

function showToast(message) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert('Informação', message);
  }
}

function handleApiError(error, defaultMessage) {
  console.error('Erro ao realizar a operação:', error);
  let userMessage;
  if (error) {
    if (error.response && error.response.data && error.response.data.message) {
      userMessage = error.response.data.message;
    } else if (error.message) {
      userMessage = error.message;
    } else {
      userMessage = defaultMessage;
    }
  } else {
    userMessage = defaultMessage;
  }
  Alert.alert('Erro', userMessage || 'Erro desconhecido.');
}

const Cartao = ({ numeroCartao, validadeCartao, cvcCartao, onDelete }) => (
  <View style={styles.cartaoContainer}>
    <Text style={styles.cartaoText}>{`Número: ${numeroCartao}`}</Text>
    <Text style={styles.cartaoText}>{`Validade: ${validadeCartao}`}</Text>
    <Text style={styles.cartaoText}>{`CVC: ${cvcCartao}`}</Text>
    <StylizedButton text="Excluir Cartão" onPress={onDelete} />
  </View>
);

export default function CreditCard() {
  const [cartoes, setCartoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    consultaCartoes();
  }, []);

  async function consultaCartoes() {
    setIsLoading(true);
    try {
      const { data } = await api.get('/cartoes');
      setCartoes(data);
    } catch (error) {
      handleApiError(error, 'Não foi possível carregar os cartões');
    } finally {
      setIsLoading(false);
    }
  }

  async function GerarCartao() {
    setIsProcessing(true);
    try {
      const { data } = await api.post('/cartoes');
      setCartoes((prevCartoes) => [...prevCartoes, data]);
      showToast('Novo cartão gerado com sucesso!');
    } catch (error) {
      handleApiError(error, 'Não foi possível gerar o cartão');
    } finally {
      setIsProcessing(false);
    }
  }

  async function deletarCartao(idCartao) {
    try {
      const response = await api.delete(`/cartoes/${idCartao}`);
      if (response.status === 204) {
        setCartoes((prevCartoes) => prevCartoes.filter((cartao) => cartao.idCartao !== idCartao));
        showToast('Cartão excluído com sucesso!');
      } else {
        handleApiError(null, `Não foi possível excluir o cartão. Código: ${response.status}`);
      }
    } catch (error) {
      handleApiError(error, 'Erro ao tentar excluir o cartão');
    }
  }

  function confirmarDelecao(idCartao) {
    Alert.alert(
      'Confirmar Exclusão',
      'Deseja excluir este cartão?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => deletarCartao(idCartao) },
      ],
      { cancelable: true }
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
    {isLoading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <FlatList
        data={cartoes}
        keyExtractor={(item) => item.idCartao.toString()}
        renderItem={({ item }) => (
          <Cartao
            numeroCartao={item.numeroCartao}
            validadeCartao={item.validadeCartao}
            cvcCartao={item.cvcCartao}
            onDelete={() => confirmarDelecao(item.idCartao)}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum cartão encontrado</Text>}
        ListHeaderComponent={
          <View style={styles.buttonContainer}>
            <StylizedButton
              text={isProcessing ? 'Gerando...' : 'Gerar Cartão'}
              onPress={GerarCartao}
              disabled={isProcessing}
            />
          </View>
        }
        contentContainerStyle={cartoes.length === 0 ? { flexGrow: 1, justifyContent: 'center' } : null}
      />
    )}
  </SafeAreaView>
  

  );
}

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    backgroundColor: '#2C3336',
  },

  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cartaoContainer: {
    marginBottom: 16,
    padding: 15,
    backgroundColor: '#252A2D',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  cartaoText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },

  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
  },

  processingContainer: {
    marginTop: 10,
    alignItems: 'center',
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});