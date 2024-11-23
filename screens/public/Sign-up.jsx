import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, StatusBar, Image } from 'react-native';
import * as Yup from 'yup'; // Importando Yup

import { api } from '../../libs/api.js';  // Two directories up to the root, then into libs/
import { darkTheme } from '../../styles/global.js'; // Importa o tema desejado
import StylizedButton from '../../components/StylizedButton.js';
import StylizedInput from '../../components/StylizedInput.js';
import StylizedInputMasked from '../../components/StylizedInputMasked.js';

// Definindo o esquema de validação com Yup
const validationSchema = Yup.object().shape({
  nome: Yup.string().required('Nome completo é obrigatório'),
  cpf: Yup.string()
    .length(14, 'CPF inválido')
    .required('CPF é obrigatório'),
  rg: Yup.string().required('RG é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  telefone: Yup.string().required('Telefone é obrigatório'),
  dataNascimento: Yup.date().required('Data de nascimento é obrigatória'),
  senha: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref('senha'), null], 'As senhas não coincidem')
    .required('Confirmar senha é obrigatório'),
  cep: Yup.string()
    .length(9, 'CEP inválido')
    .required('CEP é obrigatório'),
  endereco: Yup.string().required('Endereço é obrigatório'),
  numero: Yup.string().required('Número é obrigatório'),
});

export default function SignUpScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function convertToDate(maskedDate) {
    const [day, month, year] = maskedDate.split('/');
    const date = new Date(`${year}-${month}-${day}`);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }

  const handleCadastrar = async () => {
    const dataNascimentoFormatted = convertToDate(dataNascimento);
    console.log(dataNascimentoFormatted);
    const newErrors = {};
    console.log("Iniciando a validação");

    try {
      console.log("Validando os campos com Yup...");
      await validationSchema.validate(
        {
          nome,
          cpf,
          rg,
          email,
          telefone,
          dataNascimento: dataNascimentoFormatted,
          senha,
          confirmarSenha,
          cep,
          endereco,
          numero
        },
        { abortEarly: false }
      );

      setErrors({}); // Limpar erros antigos

      // Iniciando a requisição de cadastro
      setIsSubmitting(true);
      console.log("Realizando a requisição para cadastro...");
      

      // Realizando a requisição de cadastro
      const { data } = await api.post('/clientes', {
        nome,
        cpf,
        rg,
        email,
        telefone,
        dataNascimento: dataNascimentoFormatted,
        senha,
        cep,
        endereco,
        numero,
      });
      console.log(data);

      console.log('Cadastro realizado com sucesso:', data);
      Alert.alert('Cadastro realizado', 'Sua conta foi criada com sucesso!');
      navigation.navigate('Login');
    } catch (err) {
      setIsSubmitting(false);
      console.log("Erro encontrado durante o processo");

      if (err instanceof Yup.ValidationError) {
        // Se a validação falhar, mapeia os erros
        err.inner.forEach((validationError) => {
          newErrors[validationError.path] = validationError.message;
        });
        setErrors(newErrors); // Exibe os erros na tela
        console.log("Erro de validação:", newErrors);
      } else {
        // Se ocorrer um erro na requisição, exibe um alerta
        console.log("Erro na requisição:", err.response);
        const message = err.response?.data?.message || 'Erro ao realizar o cadastro. Tente novamente.';
        Alert.alert('Erro', message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={darkTheme.backgroundPrimary} barStyle='light-content' />

      <ScrollView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo/Logo.png')} style={styles.logo} />
        </View>
        <View style={styles.authContainer}>
          <Text style={styles.title}>CADASTRO</Text>

          <View style={styles.formContainer}>
            <StylizedInput
              icon='person'
              placeholder='Nome completo'
              value={nome}
              onChangeText={setNome}
              errors={errors.nome}
            />
            <StylizedInputMasked
              icon='fingerprint'
              placeholder='CPF'
              value={cpf}
              onChangeText={setCpf}
              errors={errors.cpf}
              maskType='cpf'
            />
            <StylizedInputMasked
              icon='fingerprint'
              placeholder='RG'
              value={rg}
              onChangeText={setRg}
              errors={errors.rg}
              maskType="custom"
              optionsMask={{
                mask: '99.999.999-9',
              }}
            />
            <StylizedInput
              icon='mail'
              placeholder='E-mail'
              value={email}
              onChangeText={setEmail}
              errors={errors.email}

            />
            <StylizedInputMasked
              icon='phone'
              placeholder='Telefone'
              value={telefone}
              onChangeText={setTelefone}
              errors={errors.telefone}
              maskType='cel-phone'
            />
            <StylizedInputMasked
              icon='calendar-today'
              placeholder='Data de nascimento'
              value={dataNascimento}
              onChangeText={setDataNascimento}
              errors={errors.dataNascimento}
              maskType='datetime'
              optionsMask={{
                format: 'DD/MM/YYYY',
              }}
            />
            <StylizedInput
              icon='password'
              placeholder='Senha'
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={true}
              errors={errors.senha}
            />
            <StylizedInput
              icon='password'
              placeholder='Confirmar senha'
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry={true}
              errors={errors.confirmarSenha}
            />
            <StylizedInputMasked
              icon='place'
              placeholder='CEP'
              value={cep}
              onChangeText={setCep}
              errors={errors.cep}
              maskType='custom'
              optionsMask={{
                mask: '99999-999',
              }}
            />
            <StylizedInput
              icon='map'
              placeholder='Endereço'
              value={endereco}
              onChangeText={setEndereco}
              errors={errors.endereco}
            />
            <StylizedInputMasked
              icon='pin'
              placeholder='Número'
              value={numero}
              onChangeText={setNumero}
              errors={errors.numero}
              maskType='only-numbers'
            />
          </View>

          <View>
            <StylizedButton
              text={
                isSubmitting ? <ActivityIndicator color="#fff" /> : 'Criar Uma conta'
              }
              onPress={
                handleCadastrar
              }
              disabled={
                isSubmitting
              }
            />
            <StylizedButton
              text='Ja tenho uma conta'
              onPress={() => navigation.navigate('Login')} />
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: darkTheme.backgroundPrimary,
  },
  container: {

  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  authContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    backgroundColor: darkTheme.backgroundSecondary,
  },
  title: {
    fontSize: 20,
    color: darkTheme.textPrimary,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formContainer: {
    marginVertical: 10,
  },
});
