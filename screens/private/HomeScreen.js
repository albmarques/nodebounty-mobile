import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, Image, RefreshControl, TouchableHighlight } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { api } from '../../libs/api.js';  // Importando a instância da API
import VisibilityBtn from '../../components/VisibityBtn';  // Componente de visibilidade
import StylizedLoading from '../../components/StylizedLoading.js';
import { darkTheme, planos } from '../../styles/global.js';
import StylizedButton from '../../components/StylizedButton.js';
import { Icon } from '@rneui/base';

export default function HomeScreen({ navigation }) {
  const [dadosConta, setDadosConta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [parceiros, setParceiros] = useState([]);

  const NumParceiros = {
    Beauty: [
      { nome: 'MAC', conta: '97126063061062518244' },
      { nome: 'MakeB', conta: '12345678901234567890', },
      { nome: 'Vult', conta: '23456789012345678901', },
    ],
    Tech: [
      { nome: 'Kabum', conta: '34567890123456789012', },
      { nome: 'Pichau', conta: '45678901234567890123', },
      { nome: 'TeraByte Shop', conta: '56789012345678901234', },
    ],
    Health: [
      { nome: 'Growth', conta: '67890123456789012345', },
      { nome: 'OficialFarma', conta: '78901234567890123456', },
      { nome: 'Drogasil', conta: '89012345678901234567', },
    ],
  };

  const loadAccountData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/conta');
      setDadosConta(response.data);
      setIsLoading(false);
      console.log(response.data);
    } catch (error) {
      setIsLoading(false);
      alert('Erro ao carregar os dados. Tente novamente mais tarde.');
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadAccountData();
  }, [loadAccountData]);

  const handleResgatar = useCallback(async () => {
    try {
      await api.post('/transacoes/resgatar');
      loadAccountData();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Erro no servidor.';
      const description = isAppError
        ? 'Verifique os dados e tente novamente.'
        : 'Tente novamente mais tarde.';

      showToast(title, description, true);
      console.log('[AppError]', error.message); // Exibe a mensagem de erro
      console.log('[AppError]', error.response?.data); // Exibe a resposta do servidor, se disponível
    }
  }, [loadAccountData]);

  const ParceirosItem = (parceiros) => {
    setParceiros(parceiros.split(',').map((parceiro) => parceiro.trim()));
  };

  useEffect(() => {
    if (dadosConta) {
      ParceirosItem(dadosConta?.plano?.parcerias);
    }
  }, [dadosConta]);

  const formatarNumero = (numero) => {
    return numero.toFixed(2).replace('.', ',');
  };

  if (isLoading) {
    return <StylizedLoading />;
  }

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const getContaParceiro = (categoria, nomeParceiro) => {
    const parceiro = NumParceiros[categoria]?.find(parceiro => parceiro.nome === nomeParceiro);
    console.log(parceiro.conta);
    return parceiro ? parceiro.conta : null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={darkTheme.backgroundPrimary} barStyle='light-content' />
      <ScrollView refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={loadAccountData}
        />
      }
        scrollEventThrottle={16}
        style={styles.geralContainer}>
        {/* Cabeçalho */}
        <View style={styles.cabecalhoContainer}>
          <View>
            <Text style={styles.cabecalhoContainer.text}>BEM VINDO, {dadosConta?.cliente?.nome?.split(' ')[0].toUpperCase()}</Text>
          </View>
          <View style={styles.cabecalhoContainer.plano}>
            <Text style={styles.cabecalhoContainer.text}>PLANO </Text>
            <Text style={[styles.cabecalhoContainer.textPlano, dadosConta?.plano?.idPlano === 'Beauty' ? { color: planos.beauty } : dadosConta?.plano?.idPlano === 'Tech' ? { color: planos.tech } : { color: planos.health }]}>{dadosConta?.plano?.idPlano?.toUpperCase()}</Text>
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

        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}> 
          <Text style={{ color: '#fff' }}>N° Conta: {dadosConta.numeroConta}</Text>
          <TouchableHighlight style={{}}>
            <Icon name='content-copy' size={20} color='#fff' />
          </TouchableHighlight>
        </View>

        <View style={styles.parceirosContainer}>
          <View>
            <Text style={styles.parceirosContainer.header.title}>COMPRE COM SEUS PARCEIROS</Text>
            <Text style={styles.parceirosContainer.header.subtitle}>
              Ganhe até {dadosConta?.plano?.porcentagemCashback}% de cashback em compras com nossos parceiros
            </Text>
          </View>

          {/* Lista de Parceiros */}
          <View style={styles.parceirosContainer.parceiroSubContainer}>
            {parceiros.map((parceiro, index) => (
              <TouchableHighlight key={index} style={styles.parceiroItem} onPress={() => {
                console.log(getContaParceiro(dadosConta?.plano?.idPlano, parceiro));
                navigation.navigate('Transfer', {
                  Conta: getContaParceiro(dadosConta?.plano?.idPlano, parceiro),
                });
              }}>
                <View style={styles.parceiroItemContainer}>
                  <View style={styles.parceiroLogoContainer}>
                    <Image source={
                      parceiro === 'Pichau' ? require('../../assets/planos/tech/Pichau.png') :
                        parceiro === 'KaBum' ? require('../../assets/planos/tech/Kabum.png') :
                          parceiro === 'TeraByte Shop' ? require('../../assets/planos/tech/Terabyte.png') :
                            parceiro === 'MAC' ? require('../../assets/planos/beauty/MAC.png') :
                              parceiro === 'MakeB' ? require('../../assets/planos/beauty/makeB.png') :
                                parceiro === 'Vult' ? require('../../assets/planos/beauty/Vult.png') :
                                  parceiro === 'Drogasil' ? require('../../assets/planos/health/drogasil.png') :
                                    parceiro === 'Growth' ? require('../../assets/planos/health/Growth.png') :
                                      parceiro === 'OficialFarma' ? require('../../assets/planos/health/oficialfarma.png') :
                                        require('../../assets/planos/tech/Pichau.png')
                    } style={{ width: 50, height: 50 }} />
                  </View>
                  <View style={styles.parceiroTextContainer}>
                    <Text style={styles.parceiroTitle}>{parceiro.toUpperCase().split(' ')[0]}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            ))}
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
              <StylizedButton text='Resgatar Cashback' icon='payments' onPress={handleResgatar} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    backgroundColor: darkTheme.backgroundPrimary,
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
      marginTop: 20,
    },
  },

  parceiroItem: {
    marginBottom: 10,
    padding: 20,
    backgroundColor: darkTheme.backgroundSecondary,
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: darkTheme.textSecondary,
    flexDirection: 'row',
  },
  parceiroItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  parceiroTitle: {
    color: darkTheme.textSecondary,
    fontSize: 25,
    fontWeight: 'bold',
  },
  parceiroTextContainer: {
    paddingLeft: 15,
    borderLeftWidth: 1,
    borderColor: darkTheme.textPrimary,
    justifyContent: 'center',
  },
  parceiroLogoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
  }
});