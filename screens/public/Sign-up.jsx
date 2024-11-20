import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import * as Yup from 'yup'; // Importando Yup
import { api } from '../../libs/api.js';  // Two directories up to the root, then into libs/
import { darkTheme } from '../../styles/global.js'; // Importa o tema desejado

import { Button } from '../../components/Button'; // Botão recriado
import { Input } from '../../components/Input'; // Input recriado

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

  const handleCadastrar = async () => {
    const newErrors = {};
    console.log("Iniciando a validação");

    try {
      console.log("Validando os campos com Yup...");
      await validationSchema.validate(
        { nome, cpf, rg, email, telefone, dataNascimento, senha, confirmarSenha, cep, endereco, numero },
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
        dataNascimento,
        senha,
        cep,
        endereco,
        numero,
      });

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
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <View style={styles.form}>
        <Input
          label="Nome Completo"
          placeholder="Digite seu nome completo"
          onChangeText={setNome}
          value={nome}
          errors={errors.nome}
        />

        <Input
          label="CPF"
          placeholder="Digite seu CPF"
          keyboardType="numeric"
          onChangeText={setCpf}
          value={cpf}
          errors={errors.cpf}
        />

        <Input
          label="RG"
          placeholder="Digite seu RG"
          onChangeText={setRg}
          value={rg}
          errors={errors.rg}
        />

        <Input
          label="E-mail"
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
          errors={errors.email}
        />

        <Input
          label="Telefone"
          placeholder="Digite seu telefone"
          keyboardType="phone-pad"
          onChangeText={setTelefone}
          value={telefone}
          errors={errors.telefone}
        />

        <Input
          label="Data de Nascimento"
          placeholder="Digite sua data de nascimento"
          keyboardType="numeric"
          onChangeText={setDataNascimento}
          value={dataNascimento}
          errors={errors.dataNascimento}
        />

        <Input
          label="Senha"
          placeholder="Digite sua senha"
          secureTextEntry
          onChangeText={setSenha}
          value={senha}
          errors={errors.senha}
        />

        <Input
          label="Confirmar Senha"
          placeholder="Confirme sua senha"
          secureTextEntry
          onChangeText={setConfirmarSenha}
          value={confirmarSenha}
          errors={errors.confirmarSenha}
        />

        <Input
          label="CEP"
          placeholder="Digite seu CEP"
          keyboardType="numeric"
          onChangeText={setCep}
          value={cep}
          errors={errors.cep}
        />

        <Input
          label="Endereço"
          placeholder="Digite seu endereço"
          onChangeText={setEndereco}
          value={endereco}
          errors={errors.endereco}
        />

        <Input
          label="Número"
          placeholder="Digite o número"
          keyboardType="numeric"
          onChangeText={setNumero}
          value={numero}
          errors={errors.numero}
        />

        <Button
          titulo={isSubmitting ? <ActivityIndicator color="#fff" /> : 'Cadastrar'}
          tipo="primario"
          onPress={handleCadastrar}
          disabled={isSubmitting}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Plans')}
          style={styles.loginRedirect}
        >
          <Text style={styles.loginRedirectText}>Já tem uma conta? Faça login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: darkTheme.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    padding: 20,
    borderRadius: 8,
  },
  loginRedirect: {
    alignSelf: 'center',
    marginTop: 20,
  },
  loginRedirectText: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
});
