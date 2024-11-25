import React, { useCallback, useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, ActivityIndicator, ToastAndroid } from "react-native";

import { darkTheme } from "../../styles/global";
import { Icon } from "@rneui/base";
import StylizedLoading from "../../components/StylizedLoading";
import VisibilityBtn from "../../components/VisibityBtn";
import { api } from "../../libs/api";
import StylizedButton from "../../components/StylizedButton";
import StylizedInput from "../../components/StylizedInput";

export default function Deposito({ navigation }) {
    const [dadosConta, setDadosConta] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [valor, setValor] = useState('0,00');

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

    const handleDepositar = async () => {
        if (!valor || parseFloat(valor) < 0.01) {
            ToastAndroid.show('O valor mínimo para depósito é de 1 centavo.', ToastAndroid.LONG);
            return;
        }

        try {
            const response = await api.post('/transacoes/depositar', { valor: parseFloat(valor) });
            if (response.status === 200) {
                ToastAndroid.show('Depósito realizado com sucesso!', ToastAndroid.LONG);
                loadAccountData();
                setValor('');
                navigation.goBack();
            } else {
                ToastAndroid.show('Erro ao depositar. Tente novamente.', ToastAndroid.LONG);
            }
        } catch {
            ToastAndroid.show('Erro ao depositar. Tente novamente.', ToastAndroid.LONG);
        }
    };

    const handleInputChange = (text) => {
        const numericValue = parseFloat(text.replace(/\D/g, '') / 100).toFixed(2);
        setValor(numericValue || '');
    };

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
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor={darkTheme.backgroundPrimary} barStyle='light-content' />
            <View style={styles.container}>

                <View style={styles.saldoContainer}>
                    <View style={styles.saldoContainer.header}>
                        <View>
                            <Text style={styles.saldoContainer.header.text}>SALDO EM CONTA</Text>
                        </View>
                        <View style={styles.saldoContainer.header.btnExtrato}>
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

                <View style={styles.formContainer}>
                    <View style={styles.form}>
                        <StylizedInput
                            label='Valor do depósito'
                            placeholder='R$ 0,00'
                            value={`R$ ${valor.replace('.', ',')}`}
                            onChangeText={handleInputChange}
                            maskType={'money'}
                            keyboardType='numeric'
                        />
                    </View>
                    <StylizedButton text={isProcessing ? <ActivityIndicator size={"small"} color={darkTheme.textPrimary} /> : 'Depositar'} icon='check' onPress={handleDepositar} />
                    <StylizedButton text={'Cancelar'} icon='cancel' onPress={() => navigation.goBack()} />
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: darkTheme.backgroundPrimary,
    },
    container: {
        flex: 1,
        backgroundColor: darkTheme.backgroundPrimary,
        marginHorizontal: 20,
        marginTop: 50,
    },
    title: {
        fontSize: 24,
        color: darkTheme.textPrimary,
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
    formContainer: {
        marginTop: 20,
        backgroundColor: darkTheme.backgroundSecondary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    form: {
        marginBottom: 20,
    },
}); 