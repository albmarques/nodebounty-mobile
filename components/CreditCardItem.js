import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export function CreditCardItem({ numeroCartao, validadeCartao, cvcCartao, color = 'blue' }) {
  const [isMasked, setIsMasked] = useState(true);

  const handleMaskToggle = () => {
    setIsMasked(!isMasked);
  };

  const formatCardNumber = (numeroCartao) => {
    return numeroCartao.replace(/(\d{4})/g, '$1 '); // Formata o número do cartão
  };

  const maskCardNumber = (numeroCartao) => {
    if (isMasked) {
      return '•••• •••• •••• ' + numeroCartao.substr(12, 4); // Mascara o número do cartão
    } else {
      return formatCardNumber(numeroCartao); // Exibe o número completo
    }
  };

  const maskCvc = (cvcCartao) => {
    return isMasked ? '•••' : cvcCartao; // Mascara o CVV
  };

  // Determina a cor de fundo com base no valor da prop 'color'
  const backgroundColor = color === 'blue' 
    ? '#2a5298' 
    : color === 'green' 
    ? '#50c878' 
    : '#3498db';

  return (
    <View style={[styles.cardContainer, { backgroundColor }]}>
      <View style={styles.cardContent}>
        <Text style={styles.cardNumber}>{maskCardNumber(numeroCartao)}</Text>
        <TouchableOpacity onPress={handleMaskToggle}>
          <Image
            source={isMasked ? eyeSlash : eye}
            style={styles.eyeIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Validade</Text>
          <Text style={styles.info}>{validadeCartao}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>CVV</Text>
          <Text style={styles.info}>{maskCvc(cvcCartao)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    height: 200,
    borderRadius: 15,
    padding: 20,
    justifyContent: 'space-between',
    marginVertical: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  eyeIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff', // Altera a cor do ícone para branco
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  infoBlock: {
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 14,
    color: '#ddd',
  },
  info: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
