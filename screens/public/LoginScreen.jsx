import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as Yup from 'yup'; // Importing Yup for validation
import { AuthContext } from '../../contexts/AuthContext.jsx';  // Adjust the path to go up two directories




import { api } from '../../libs/api.js'; // Adjust path to go up two directories

import { Button } from '../../components/Button'; // Reusable Button component
import { Input } from '../../components/Input'; // Reusable Input component

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
      navigation.navigate('Dashboard');
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
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.form}>
        {/* Email Input */}
        <Input
          label="E-mail"
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
          errors={errors.email}
        />

        {/* Password Input */}
        <Input
          label="Senha"
          placeholder="Digite sua senha"
          secureTextEntry
          onChangeText={setSenha}
          value={senha}
          errors={errors.senha}
        />

        {/* Forgot password link */}
        <TouchableOpacity
          onPress={() => navigation.navigate('RecuperarSenha')}
          style={styles.passwordRecovery}
        >
          <Text style={styles.passwordRecoveryText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <Button
          titulo={isSubmitting ? <ActivityIndicator color="#fff" /> : 'Entrar'}
          tipo="primario"
          onPress={handleRealizarLogin}
          disabled={isSubmitting}
        />

        {/* Sign up Button */}
        <Button
          titulo="Abra sua conta"
          tipo="primario"
          onPress={() => navigation.navigate('Cadastrar')}
          disabled={isSubmitting}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Corrected color code
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', // Changed to white for better visibility on dark background
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    padding: 20,
    borderRadius: 8,
  },
  passwordRecovery: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  passwordRecoveryText: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
});
