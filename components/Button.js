import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export function Button({ tipo = 'primario', titulo, disabled, ...rest }) {
  const isPrimary = tipo === 'primario';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary ? styles.buttonPrimary : styles.buttonSecondary,
        disabled && styles.buttonDisabled,
      ]}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
      {...rest}
    >
      <Text style={[styles.text, isPrimary ? styles.textPrimary : styles.textSecondary]}>
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop:10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    minWidth: 150,
    justifyContent: 'center',
    alignItems: 'center',
    transition: '0.3s', // Usado apenas no comportamento visual entre estados
  },
  buttonPrimary: {
    backgroundColor: 'rgba(77, 77, 77, 0.3)',
    borderColor: 'white',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderColor: 'white',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 18,
    lineHeight: 22,
    color: 'white',
  },
  textPrimary: {},
  textSecondary: {
    color: 'white',
  },
});

export default Button;
