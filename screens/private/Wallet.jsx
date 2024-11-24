import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { api } from '../../libs/api.js';
import { darkTheme, planos } from '../../styles/global.js'; // Importa o tema desejado
import StylizedButton from '../../components/StylizedButton';
import { Deposit } from '../../components/Depositar.jsx';
import { Withdraw } from '../../components/Withdraw.jsx';
import { Transfer } from '../../components/Transfer.jsx';
import { Extract } from '../../components/Extract.jsx';
import StylizedLoading from '../../components/StylizedLoading';
import VisibilityBtn from '../../components/VisibityBtn';

export default function WalletScreen() {
  const [activeComponent, setActiveComponent] = useState('DEPOSITAR'); // Define o estado inicial
  const [dadosConta, setDadosConta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const loadAccountData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/conta');
      setDadosConta(response.data);
      console.log(response.data);
    } catch (error) {
      alert('Erro ao carregar os dados. Tente novamente mais tarde.');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAccountData();
  }, [loadAccountData]);

  const formatarNumero = (numero) => {
    return numero.toFixed(2).replace('.', ',');
  };

  if (isLoading) {
    return <StylizedLoading />;
  }

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'DEPOSITAR':
        return <Deposit />;
      case 'SACAR':
        return <Withdraw />;
      case 'TRANSFERIR':
        return <Transfer />;
      case 'EXTRATO':
        return <Extract />;

      default:
        return <Text style={styles.operationText}>Escolha uma opção</Text>;
    }
  };

  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={isLoading} onRefresh={loadAccountData}
      />
    } style={styles.container}>

      <View style={styles.cabecalhoContainer}>
        <View>
          <Text style={styles.cabecalhoContainer.text}>BEM VINDO, {dadosConta?.cliente?.nome?.split(' ')[0].toUpperCase()}</Text>
        </View>
        <View style={styles.cabecalhoContainer.plano}>
          <Text style={styles.cabecalhoContainer.text}>PLANO </Text>
          <Text style={[styles.cabecalhoContainer.textPlano, dadosConta?.plano?.idPlano === 'Beauty' ? { color: planos.beauty } : dadosConta?.plano?.idPlano === 'Tech' ? { color: planos.tech } : { color: planos.health }]}>{dadosConta?.plano?.idPlano?.toUpperCase()}</Text>
        </View>
      </View>

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

      {/* Aqui o texto renderizado de acordo com o botão pressionado */}
      <View style={styles.operationsContainer}>
        {renderComponent()}
      </View>

      <View style={styles.operationsContainer}>
        <TouchableOpacity
          style={styles.operationButton}
          onPress={() => setActiveComponent('DEPOSITAR')}
        >
          <Text style={styles.operationText}>DEPOSITAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.operationButton}
          onPress={() => setActiveComponent('SACAR')}
        >
          <Text style={styles.operationText}>SACAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.operationButton}
          onPress={() => setActiveComponent('TRANSFERIR')}
        >
          <Text style={styles.operationText}>TRANSFERIR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundPrimary,
    padding: 20,
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

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  plan: {
    fontSize: 18,
    color: darkTheme.primary,
    fontWeight: 'bold',
  },
  balanceContainer: {
    backgroundColor: '#1C1F2A',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#888',
  },
  balanceValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  balanceValue: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  eyeIcon: {
    backgroundColor: '#444',
    borderRadius: 20,
    padding: 10,
  },
  eyeText: {
    fontSize: 18,
    color: '#fff',
  },
  extractText: {
    fontSize: 16,
    color: '#00B0FF',
    textAlign: 'right',
  },
  operationsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  operationButton: {
    backgroundColor: '#444',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  operationText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
