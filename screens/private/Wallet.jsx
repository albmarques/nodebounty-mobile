import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { darkTheme } from '../../styles/global.js'; // Importa o tema desejado
import StylizedButton from '../../components/StylizedButton';
import { Deposit } from '../../components/Depositar.jsx';
import { Withdraw } from '../../components/Withdraw.jsx';
import { Transfer } from '../../components/Transfer.jsx';
import { Extract } from '../../components/Extract.jsx';
import { ScrollView } from 'react-native-gesture-handler';

export default function WalletScreen() {
  const [activeComponent, setActiveComponent] = useState('DEPOSITAR'); // Define o estado inicial

  const renderComponent = () => {
    switch (activeComponent) {
      case 'DEPOSITAR':
        return <Deposit/>;
      case 'SACAR':
        return <Withdraw/>;
      case 'TRANSFERIR':
        return <Transfer/>;
      case 'EXTRATO':
        return <Extract/>;
        
      default:
        return <Text style={styles.operationText}>Escolha uma opção</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MINHA CARTEIRA</Text>
        <Text style={styles.plan}>PLANO TECH</Text>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>SALDO EM CONTA</Text>
        <View style={styles.balanceValueContainer}>
          <Text style={styles.balanceValue}>R$ 123.456,99</Text>
          <TouchableOpacity style={styles.eyeIcon}  >
            <Text style={styles.eyeText}>👁️</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setActiveComponent('EXTRATO')}>
          <Text style={styles.extractText}>VER EXTRATO</Text>
        </TouchableOpacity>
      </View>

      {/* Aqui o texto renderizado de acordo com o botão pressionado */}
      <View style={styles.operationsContainer}>
        {renderComponent()}
      </View>

      <View style={styles.operationsContainer}>
        <TouchableOpacity
          style={styles.operationButton}
          onPress={() => setActiveComponent('DEPOSITAR')}
        >
          <Text style={styles.operationText}>DEPOSITAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.operationButton}
          onPress={() => setActiveComponent('SACAR')}
        >
          <Text style={styles.operationText}>SACAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.operationButton}
          onPress={() => setActiveComponent('TRANSFERIR')}
        >
          <Text style={styles.operationText}>TRANSFERIR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundPrimary,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  plan: {
    fontSize: 18,
    color: darkTheme.primary,
    fontWeight: 'bold',
  },
  balanceContainer: {
    backgroundColor: '#1C1F2A',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#888',
  },
  balanceValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  balanceValue: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  eyeIcon: {
    backgroundColor: '#444',
    borderRadius: 20,
    padding: 10,
  },
  eyeText: {
    fontSize: 18,
    color: '#fff',
  },
  extractText: {
    fontSize: 16,
    color: '#00B0FF',
    textAlign: 'right',
  },
  operationsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  operationButton: {
    backgroundColor: '#444',
    paddingVertical: 15,
    paddingHorizontal:15,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  operationText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
