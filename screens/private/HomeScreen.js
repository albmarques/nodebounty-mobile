import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { api } from '../../libs/api.js';  // Importando a instância da API
import VisibilityBtn from '../../components/VisibityBtn';  // Componente de visibilidade

export default function HomeScreen() {
  const [dadosConta, setDadosConta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const loadAccountData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/conta');
      setDadosConta(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert('Erro ao carregar os dados. Tente novamente mais tarde.');
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadAccountData();
  }, [loadAccountData]);

  const formatarNumero = (numero) => {
    return numero.toFixed(2).replace('.', ',');
  };

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor='#2C3336' barStyle='light-content' />
      <ScrollView style={styles.geralContainer}>
        {/* Cabeçalho */}
        <View style={styles.cabecalhoContainer}>
          <View>
            <Text style={styles.cabecalhoContainer.text}>BEM VINDO, {dadosConta?.cliente?.nome?.split(' ')[0].toUpperCase()}</Text>
            {/* Adicionando o número da conta */}
            <Text style={styles.cabecalhoContainer.text}>Conta: {dadosConta?.numeroConta}</Text>
          </View>
          <View style={styles.cabecalhoContainer.plano}>
            <Text style={styles.cabecalhoContainer.text}>PLANO </Text>
            <Text style={styles.cabecalhoContainer.textPlano}>{dadosConta?.plano?.idPlano?.toUpperCase()}</Text>
          </View>
        </View>

        {/* Restante do conteúdo */}
        <View style={styles.saldoContainer}>
          <View style={styles.saldoContainer.header}>
            <View>
              <Text style={styles.saldoContainer.header.text}>SALDO EM CONTA</Text>
            </View>
            <View style={styles.saldoContainer.header.btnExtrato}>
              <Text style={styles.saldoContainer.header.text}>VER EXTRATO </Text>
            </View>
          </View>

          <View style={styles.saldoContainer.saldo}>
            <View>
              <View style={styles.saldoContainer.saldo.containerValor}>
                <Text style={styles.saldoContainer.saldo.containerValor.R$}>R$</Text>
                <Text style={styles.saldoContainer.saldo.containerValor.valor}>
                  {visible ? formatarNumero(dadosConta?.saldoConta) : '••••'}
                </Text>
              </View>
            </View>
            <View>
              <VisibilityBtn visible={visible} toggleVisibility={toggleVisibility} />
            </View>
          </View>
        </View>

        <View style={styles.parceirosContainer}>
          <View>
            <Text style={styles.parceirosContainer.header.title}>PARCEIROS DO SEU PLANO</Text>
            <Text style={styles.parceirosContainer.header.subtitle}>
              Ganhe até {dadosConta?.plano?.porcentagemCashback}% de cashback em compras com nossos parceiros
            </Text>
          </View>

          {/* Lista de Parceiros */}
          <View style={styles.parceirosContainer.parceiroSubContainer}>
            {dadosConta?.plano?.parceiros?.[dadosConta?.plano?.idPlano] ? (
              dadosConta?.plano?.parceiros?.[dadosConta?.plano?.idPlano]?.map((item) => (
                <View key={item.conta} style={styles.parceiroItem}>
                  <Text style={styles.parceiroItem.nome}>{item.nome}</Text>
                  <Text style={styles.parceiroItem.conta}>Número da conta: {item.conta}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.parceirosContainer.header.subtitle}>Nenhum parceiro disponível.</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    backgroundColor: '#2C3336',
  },

  geralContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },

  cabecalhoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    plano: {
      flexDirection: 'row',
    },

    text: {
      color: '#fff',
      fontSize: 14,
    },

    textPlano: {
      color: '#D904CB',
      fontSize: 14,
      fontWeight: 'bold',
    }
  },

  saldoContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#252A2D',
    borderRadius: 10,

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',

      text: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
      },

      btnExtrato: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }
    },

    saldo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      containerValor: {
        flexDirection: 'row',
        gap: 5,

        valor: {
          color: '#fff',
          fontSize: 35,
          fontWeight: 'thin',
        },

        R$: {
          marginTop: 8,
          color: '#A6A6A6',
          fontSize: 15,
          fontWeight: 'thin',
        },

        visibility: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
  },

  parceirosContainer: {
    marginTop: 20,

    header: {
      title: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
      },

      subtitle: {
        color: '#A6A6A6',
        fontSize: 11,
      },
    },

    parceiroSubContainer: {
      marginTop: 10,
    },
  },

  parceiroItem: {
    marginBottom: 15,
  },

  parceiroItem: {
    marginBottom: 10,
  },

  parceiroItem: {
    marginBottom: 10,
  },

  parceiroItem: {
    marginBottom: 10,
  },
});
