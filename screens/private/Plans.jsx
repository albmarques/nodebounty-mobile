import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';import { api } from '../../libs/api.js'; // Ajuste o caminho do arquivo da API
import { AuthContext } from '../../contexts/AuthContext.jsx'; // Ajuste o caminho do seu contexto

export default function Dashboard({ navigation }) {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null); // Atualizado para armazenar o plano selecionado
  const { logout } = useContext(AuthContext);
 useEffect(() => {
    async function retrievePlansData() {
      try {
        setIsLoading(true);
        const response = await api.get('/conta');

        // Usuário possui conta, redirecionar para a tela principal
        if (response.status === 200) {
          navigation.navigate('MainTabs');
        }
      } catch (error) {
        // Usuário não possui conta, pegar os dados dos planos
        try {
          const { data } = await api.get('/planos');
          if (data && Array.isArray(data)) {
            setPlans(data);
          } else {
            throw new Error('Plano inválido');
          }
          setIsLoading(false);
        } catch (error) {
          Alert.alert('Erro', 'Ocorreu um erro ao carregar os planos');
          console.log(error);
          logout();
        }
      }
    }
    retrievePlansData();
  }, [logout, navigation]);
async function handleSubmitPlan() {
    if (!selectedPlan) {
      Alert.alert('Erro', 'Por favor, selecione um plano');
      return;
    }

    try {
      await api.post('/conta', { nomePlano: selectedPlan });
      navigation.navigate('MainTabs');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro, por favor tente novamente');
      console.log(error);
    }
  }

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FFF" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha seu Plano</Text>

      {plans.map((plan) => (
        <TouchableOpacity
          key={plan.idPlano}
          style={[
            styles.card,
            selectedPlan === plan.idPlano && styles.selectedCard, // Estilo para card selecionado
          ]}
          onPress={() => setSelectedPlan(plan.idPlano)} // Atualiza o plano selecionado
        >
          <Text style={styles.cardTitle}>Plano {plan.idPlano}</Text>
          <Text style={styles.cardText}>
            Cashback exclusivo de <Text style={styles.bold}>{plan.porcentagemCashback}%</Text> para{' '}
            {plan.categoria}.
          </Text>
          <Text style={styles.cardText}>Com desconto nas parcerias:</Text>
          <Text style={styles.cardText}>
            <Text style={styles.bold}>{plan.parcerias}</Text>
          </Text>
        </TouchableOpacity>
      ))}

      <Button title="Confirmar plano" onPress={handleSubmitPlan} />

      {selectedPlan && <Text style={styles.selectedText}>Plano Selecionado: {selectedPlan}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#252A2D',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#333',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  selectedCard: {
    borderColor: '#07b0f2',
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardText: {
    color: '#fff',
    fontSize: 14,
  },
  bold: {
    fontWeight: 'bold',
  },
  selectedText: {
    marginTop: 20,
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
