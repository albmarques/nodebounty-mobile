import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ToastAndroid, ActivityIndicator } from "react-native";

import { darkTheme } from "../../styles/global.js"; // Importa o tema Dark
import StylizedButton from "../../components/StylizedButton.js";
import StylizedInput from "../../components/StylizedInput.js";
import StylizedInputMasked from '../../components/StylizedInputMasked.js';
import { api } from "../../libs/api.js";
import { ScrollView } from 'react-native-gesture-handler';

export default function DadosPessoais({ navigation }) {

    const [dadosConta, setDadosConta] = useState(null);

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

    const [nome, setNome] = useState(dadosConta?.cliente?.nome);
    const [telefone, setTelefone] = useState(dadosConta?.cliente?.telefone);
    const [cep, setCep] = useState(dadosConta?.cliente?.cep);
    const [endereco, setEndereco] = useState(dadosConta?.cliente?.endereco);
    const [numero, setNumero] = useState(dadosConta?.cliente?.numero);
    const [senha, setSenha] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleAtualizarUsuario = useCallback(async (formData) => {
        try {
            setIsSubmitting(true);
            await api.put('/clientes', formData);
            loadAccountData(); // Chamando a função para carregar os dados novamente
            setIsSubmitting(false);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Erro no servidor.';
            const description = isAppError
                ? 'Verifique os dados e tente novamente.'
                : 'Tente novamente mais tarde.';

            alert(title, description, true);
            console.log('[AppError]', error.message); // Exibe a mensagem de erro
            console.log('[AppError]', error.response?.data); // Exibe a resposta do servidor, se disponível
            setIsSubmitting(false);
        }
    }, [loadAccountData]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={darkTheme.backgroundPrimary}
                barStyle="light-content"
            />

            <ScrollView>
                <View style={styles.dataContaier}>
                    <View style={styles.formGroup}>
                        <StylizedInput
                            icon='person'
                            placeholder={dadosConta?.cliente?.nome}
                            label="Nome"
                            value={nome}
                            onChangeText={setNome}
                            error={errors.nome}
                        />
                        <StylizedInputMasked
                            label={'Telefone'}
                            icon='phone'
                            placeholder={dadosConta?.cliente?.telefone}
                            value={telefone}
                            onChangeText={setTelefone}
                            errors={errors.telefone}
                            maskType='cel-phone'
                            keyboardType='numeric'
                        />
                        <StylizedInputMasked
                            label={'CEP'}
                            icon='place'
                            placeholder={dadosConta?.cliente?.cep}
                            value={cep}
                            onChangeText={setCep}
                            errors={errors.cep}
                            maskType='custom'
                            optionsMask={{
                                mask: '99999-999',
                            }}
                            keyboardType='numeric'
                        />
                        <StylizedInput
                            icon='map'
                            placeholder={dadosConta?.cliente?.endereco}
                            label="Endereço"
                            value={endereco}
                            onChangeText={setEndereco}
                            error={errors.endereco}
                        />
                        <StylizedInputMasked
                            label={'Número'}
                            icon='pin'
                            placeholder={dadosConta?.cliente?.numero.toString()}
                            value={numero}
                            onChangeText={setNumero}
                            errors={errors.numero}
                            keyboardType='numeric'
                            maskType={'custom'}
                            maxLength={5}
                        />
                        <StylizedInput
                            label={'Senha'}
                            icon='password'
                            placeholder='Nova Senha'
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry={true}
                            errors={errors.senha}
                        />

                    </View>
                    <StylizedButton
                        icon='update'
                        text={isSubmitting ? <ActivityIndicator color={darkTheme.textPrimary} size='small' /> : 'Atualizar'}
                        onPress={() => handleAtualizarUsuario({
                            nome,
                            telefone,
                            cep,
                            endereco,
                            numero,
                            senha
                        })}
                        loading={isSubmitting}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkTheme.backgroundPrimary,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    dataContaier: {
        marginTop: 40,
        marginBottom: 20,
        backgroundColor: darkTheme.backgroundSecondary,
        paddingVertical: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    formGroup: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 20,
    },
});
