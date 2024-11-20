import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { api } from '../../libs/api.js'; // Ajuste o caminho do arquivo da API
import { AuthContext } from '../../contexts/AuthContext.jsx'; // Ajuste o caminho do seu contexto

export default function Plans({ navigation }) {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { logout, token } = useContext(AuthContext);

  useEffect(() => {
    api.registerInterceptTokenManager(logout, () => token);

    async function retrivePlansData() {
      try {
        setIsLoading(true);
        const response = await api.get('/conta');

        if (response.status === 200) {
          console.log(response.data);
          navigation.navigate('RootTabs');
        }
      } catch (error) {
        console.log(error);
        try {
          const { data } = await api.get('/planos');
          console.log(data);
          setPlans(data);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          alert('Erro ao carregar planos');
          logout();
        }
      }
    }
    retrivePlansData();
  }, [logout, navigation, token]);

  async function handleSubmitPlan() {
    if (!selectedPlan) {
      Alert.alert('Erro', 'Por favor, selecione um plano');
      return;
    }

    try {
      await api.post('/conta', { nomePlano: selectedPlan });
      navigation.navigate('RootTabs');
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
            selectedPlan === plan.idPlano && styles.selectedCard,
          ]}
          onPress={() => setSelectedPlan(plan.idPlano)}
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