import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator, ToastAndroid, Platform, SafeAreaView, ScrollView, TouchableHighlight, Image, Dimensions } from 'react-native';
import { planos, darkTheme } from '../../styles/global.js';
import { api } from '../../libs/api.js';
import StylizedButton from '../../components/StylizedButton';
import CreditCardItem from "../../components/CreditCardItem";
import { Icon } from '@rneui/base';

function showToast(message) {
    if (Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
        Alert.alert('Informação', message);
    }
}

const { width } = Dimensions.get('window');

function handleApiError(error, defaultMessage) {
    console.error('Erro ao realizar a operação:', error);
    let userMessage = defaultMessage;
    if (error) {
        if (error.response && error.response.data && error.response.data.message) {
            userMessage = error.response.data.message;
        } else if (error.message) {
            userMessage = error.message;
        }
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
    const [dadosConta, setDadosConta] = useState(null);

    const consultaCartoes = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data } = await api.get('/cartoes');
            setCartoes(data);
        } catch (error) {
            handleApiError(error, 'Não foi possível carregar os cartões');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        consultaCartoes();
    }, [consultaCartoes]);

    const loadAccountData = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/conta');
            setDadosConta(response.data);
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

    const GerarCartao = async () => {
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
    };

    const deletarCartao = async (idCartao) => {
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
    };

    const confirmarDelecao = (idCartao) => {
        Alert.alert(
            'Confirmar Exclusão',
            'Deseja excluir este cartão?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Excluir', onPress: () => deletarCartao(idCartao) },
            ],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.geralContainer}>
                <View style={styles.cabecalhoContainer}>
                    <Text style={styles.cabecalhoText}>BEM VINDO, {dadosConta?.cliente?.nome?.split(' ')[0].toUpperCase()}</Text>
                    <View style={styles.planoContainer}>
                        <Text style={styles.cabecalhoText}>PLANO </Text>
                        <Text style={[styles.planoText, { color: planos[dadosConta?.plano?.idPlano?.toLowerCase()] }]}>{dadosConta?.plano?.idPlano?.toUpperCase()}</Text>
                    </View>
                </View>
                <ScrollView horizontal={true} style={styles.cartoesContainer}>
                    <View style={styles.cartoesSubContainer}>
                        {isLoading ? (
                            <View style={styles.CardContainer}>
                                <ActivityIndicator size="large" color={darkTheme.textPrimary} />
                            </View>
                        ) : (
                            cartoes.map((cartao) => (
                                <CreditCardItem
                                    key={cartao.idCartao}
                                    cartao={cartao}
                                    plano={dadosConta?.plano?.idPlano}
                                    onDelete={() => confirmarDelecao(cartao.idCartao)}
                                />
                            ))
                        )}

                        <TouchableHighlight onPress={GerarCartao} style={styles.newCardContainer}>
                            <View style={styles.newCardSubContainer}>
                                <View style={styles.newCardLogoContainer}>
                                    <Image
                                        source={require('../../assets/cardsLogo/Logo.png')}
                                        style={styles.bandeiras}
                                    />
                                    <Image
                                        source={require('../../assets/cardsLogo/MasterCard.png')}
                                        style={styles.masterCardLogo}
                                    />
                                </View>
                                <View style={styles.newCardTextContainer}>
                                    <Icon name='add-circle-outline' color={darkTheme.textSecondary} size={24} />
                                    <Text style={styles.newCardText}>Criar Novo Cartão</Text>
                                </View>
                            </View>
                        </TouchableHighlight>

                    </View>
                </ScrollView>
                <View style={styles.movimentacaoContainer}>

                    <ScrollView>
                        
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: darkTheme.backgroundPrimary,
    },
    geralContainer: {
        marginTop: 20,
        width: '100%',
    },
    cabecalhoContainer: {
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    planoContainer: {
        flexDirection: 'row',
    },
    cabecalhoText: {
        color: '#fff',
        fontSize: 14,
    },
    planoText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    cartoesContainer: {
        width: '100%',
        height: '35%',
    },
    cartoesSubContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    newCardContainer: {
        backgroundColor: darkTheme.backgroundSecondary,
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderWidth: 0.6,
        borderColor: darkTheme.textSecondary,
        flex: 1,
        width: width * 0.94,
    },
    newCardSubContainer: {
        alignItems: 'center',
    },
    newCardLogoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    newCardTextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    newCardText: {
        color: darkTheme.textSecondary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    bandeiras: {
        height: 30,
        width: 50,
        resizeMode: 'contain',
    },
    masterCardLogo: {
        height: 20,
        width: 30,
        resizeMode: 'contain',
    },
    movimentacaoContainer: {
        width: '100%',
        height: '65%',
        backgroundColor: darkTheme.backgroundPrimary,
    },
});