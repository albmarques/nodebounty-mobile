import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Icon } from '@rneui/themed';

import data from '../../data/data.json';
import VisibilityBtn from '../../components/VisibityBtn';

const conta = data;

export default function HomeScreen() {

    const [visible, setVisible] = React.useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const formatarNumero = (numero) => {
        return numero.toFixed(2).replace('.', ',');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor='#2C3336' barStyle='light-content' />
            <ScrollView style={styles.geralContainer}>

                {/* Cabeçalho */}
                <View style={styles.cabecalhoContainer}>
                    <View>
                        <Text style={styles.cabecalhoContainer.text}>BEM VINDO, {conta.cliente.nome.split(' ')[0].toUpperCase()}</Text>
                    </View>
                    <View style={styles.cabecalhoContainer.plano}>
                        <Text style={styles.cabecalhoContainer.text}>PLANO </Text>
                        <Text style={styles.cabecalhoContainer.textPlano}>{conta.plano.idPlano.toUpperCase()}</Text>
                    </View>
                </View>

                {/* Saldo */}
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
                                <Text style={styles.saldoContainer.saldo.containerValor.valor}>{visible ? formatarNumero(conta.saldoConta) : '••••'}</Text>
                            </View>
                        </View>
                        <View>
                            <VisibilityBtn visible={visible} toggleVisibility={toggleVisibility} />
                        </View>
                    </View>
                </View>

                {/* Parceiros */}
                <View style={styles.parceirosContainer}>
                    <View>
                        <View>
                            <Text style={styles.parceirosContainer.header.title}>PARCEIROS DO SEU PLANO</Text>
                        </View>
                        <View>
                            <Text style={styles.parceirosContainer.header.subtitle}>Ganhe até 5% de cashback em compras com nossos parceiros</Text>
                        </View>
                    </View>

                    <View>

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
        },
    },
});