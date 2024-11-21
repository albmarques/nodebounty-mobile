import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native';
import * as Yup from 'yup'; // Importing Yup for validation

import { AuthContext } from '../../contexts/AuthContext.jsx';  // Adjust the path to go up two directories
import { darkTheme } from '../../styles/global.js'; // Importa o tema desejado
import { api } from '../../libs/api.js'; // Adjust path to go up two directories
import StylizedButton from '../../components/StylizedButton.js'; // Reusable StylizedButton component
import StylizedInput from '../../components/StylizedInput.js';

// Defining the validation schema with Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  senha: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
});

export default function LoginScreen({ navigation }) {
  const { saveToken } = useContext(AuthContext); // Access saveToken from AuthContext
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle login function
  const handleRealizarLogin = async () => {
    try {
      // Validate with Yup
      await validationSchema.validate({ email, senha }, { abortEarly: false });

      setErrors({}); // Clear any previous errors
      setIsSubmitting(true); // Start submitting

      // Send login request
      const { data } = await api.post('/clientes/login', { email, senha });
      console.log('Login successful:', data.token);

      // Save the token in context and AsyncStorage
      saveToken(data.token); // Store token

      // Redirect to Dashboard
      //navigation.navigate('Plans');
    } catch (err) {
      setIsSubmitting(false); // End submitting

      if (err instanceof Yup.ValidationError) {
        const newErrors = {};
        err.inner.forEach((validationError) => {
          newErrors[validationError.path] = validationError.message;
        });
        setErrors(newErrors); // Set validation errors
      } else {
        console.error('Login error:', err.response?.data || err.message);
        alert(
          err.response?.data?.message || 'Erro ao realizar login. Tente novamente.'
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={darkTheme.backgroundPrimary} barStyle='light-content' />

      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo/Logo.png')} style={styles.logo} />
        </View>
        <View style={styles.authContainer}>
          <Text style={styles.title}>ACESSO</Text>

          <View style={styles.formContainer}>
            <StylizedInput icon='mail' placeholder='E-MAIL' value={email} onChangeText={setEmail} />
            <StylizedInput icon='password' placeholder='SENHA' value={senha} onChangeText={setSenha} secureTextEntry={true} />
          </View>

          <View>
            <StylizedButton text={isSubmitting ? <ActivityIndicator color="#fff" /> : 'Entrar'} onPress={handleRealizarLogin} disabled={isSubmitting} />
            <StylizedButton text='ABRIR UMA CONTA' />
          </View>
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
    alignItems: 'center',
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
