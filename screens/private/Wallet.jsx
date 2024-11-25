import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, RefreshControl, TouchableHighlight } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { api } from '../../libs/api.js';
import { darkTheme, planos } from '../../styles/global.js'; // Importa o tema desejado
import StylizedButton from '../../components/StylizedButton';
import StylizedLoading from '../../components/StylizedLoading';
import VisibilityBtn from '../../components/VisibityBtn';
import { Icon } from '@rneui/base';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

export default function WalletScreen({ navigation }) {
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
            <Text style={styles.saldoContainer.header.text} onPress={() => setActiveComponent('EXTRATO')} >VER EXTRATO </Text>
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
        <Text style={styles.operationTitle}>OPERAÇÕES</Text>

        <View style={styles.operationsSubContainer}>

          <TouchableHighlight style={styles.operationBtnContainer} onPress={() => navigation.navigate('Deposito')}>
            <View style={styles.operationBtn}>
              <Icon name="arrow-bottom-right-thin" size={30} type="material-community" color={darkTheme.textSecondary} />
              <Text style={styles.operationBtnText}>Depositar</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight style={styles.operationBtnContainer} onPress={() => navigation.navigate('Saque')}>
            <View style={styles.operationBtn}>
              <Icon name="arrow-top-left-thin" size={30} type="material-community" color={darkTheme.textSecondary} />
              <Text style={styles.operationBtnText}>Sacar</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight style={styles.operationBtnContainer} onPress={() => navigation.navigate('Transfer', {
            Conta: ""
          })}>
            <View style={styles.operationBtn}>
              <Icon name="swap-horizontal" size={30} type="material-community" color={darkTheme.textSecondary} />
              <Text style={styles.operationBtnText}>Trasnferir</Text>
            </View>
          </TouchableHighlight>

        </View>
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

  operationsContainer: {
    marginTop: 20,
  },
  operationTitle: {
    color: '#fff',
    fontSize: 15,
  },
  operationsSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor: darkTheme.backgroundSecondary,
    padding: 10,
    borderRadius: 10,

  },

  operationBtnContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },

  operationBtn: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: darkTheme.textSecondary,
    width: width * 0.26,
    height: width * 0.26,
  },
  operationBtnText: {
    color: darkTheme.textSecondary,
    fontSize: 12,
  },
});
