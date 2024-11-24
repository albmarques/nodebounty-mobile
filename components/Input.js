import React from 'react';
import { darkTheme } from "../styles/global.js";
import { View, Text, TextInput, StyleSheet } from 'react-native';

export function Input({ label, icon, errors, placeholder, ...rest }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, errors && styles.errorBorder]}>
        <TextInput 
          style={styles.input} 
          placeholder={placeholder} // Adiciona o placeholder
          placeholderTextColor={darkTheme.textPrimary} // Define a cor do placeholder conforme o tema
          {...rest} 
        />
        {icon && <View style={styles.icon}>{icon}</View>}
      </View>
      {errors && <Text style={styles.errorMessage}>{errors}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: '100%',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: darkTheme.primary, // Cor do texto do label
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: darkTheme.textPrimary, // Cor da borda padrão
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: darkTheme.textPrimary, // Cor do texto digitado
    backgroundColor: darkTheme.backgroundPrimary, // Cor de fundo do input
    paddingVertical: 5,
  },
  icon: {
    marginLeft: 10,
  },
  errorBorder: {
    borderBottomColor: 'red', // Cor da borda em caso de erro
  },
  errorMessage: {
    marginTop: 5,
    fontSize: 12,
    color: 'red', // Cor da mensagem de erro
  },
});

