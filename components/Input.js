import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export function Input({ label, icon, errors, ...rest }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, errors && styles.errorBorder]}>
        <TextInput style={styles.input} {...rest} />
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
    color: '#fff', // Ajuste a cor conforme necessário
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff', // Ajuste a cor do texto conforme necessário
    paddingVertical: 5,
  },
  icon: {
    marginLeft: 10,
  },
  errorBorder: {
    borderBottomColor: 'red',
  },
  errorMessage: {
    marginTop: 5,
    fontSize: 12,
    color: 'red',
  },
});
