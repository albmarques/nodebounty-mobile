import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, ImageBackground } from 'react-native';

import { api } from '../../libs/api.js'; // Ajuste o caminho do arquivo da API
import { AuthContext } from '../../contexts/AuthContext.jsx'; // Ajuste o caminho do seu contexto
import { darkTheme, planos } from '../../styles/global.js';
import { Icon } from '@rneui/base';
import StylizedButton from '../../components/StylizedButton.js';

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
          navigation.replace('RootTabs');
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
      navigation.popTo('RootTabs');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro, por favor tente novamente');
      console.log(error);
    }
  }

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FFF" />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={darkTheme.backgroundPrimary} />
      <Text style={styles.title}>ESCOLHA SEU PLANO</Text>
      <ScrollView>
        {plans.map((plan) => (
          <TouchableOpacity
            key={plan.idPlano}
            style={[
              styles.card,
              selectedPlan === plan.idPlano && styles.selectedCard, { borderColor: plan.idPlano === 'Tech' ? planos.tech : plan.idPlano === 'Beauty' ? planos.beauty : planos.health }
            ]}
            onPress={() => setSelectedPlan(plan.idPlano)}
          >
            <ImageBackground
              source={plan.idPlano === 'Tech' ? require('../../assets/BG/TechBG.png') : plan.idPlano === 'Beauty' ? require('../../assets/BG/BeautyBG.png') : require('../../assets/BG/HealthBG.png')}
              style={styles.backgroundIMG}
            >
              <View>

                <View style={styles.cardHeaderContainer}>
                  <View>
                    <Icon
                      style={styles.iconContainer}
                      name={
                        plan.idPlano === 'Tech' ? 'memory' : plan.idPlano === 'Beauty' ? 'checkroom' : 'health-and-safety'
                      }
                      size={40}
                      color={
                        plan.idPlano === 'Tech' ? planos.tech : plan.idPlano === 'Beauty' ? planos.beauty : planos.health
                      } />
                  </View>
                  <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}>{plan.idPlano.toUpperCase()}</Text>
                  </View>
                </View>

                {
                  selectedPlan === plan.idPlano ? <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>Cashback exclusivo de {plan.porcentagemCashback}% para as seguintes PARCEIRAS:</Text>

                    <Text style={styles.parcerias}>{plan.parcerias}</Text>
                  </View> : null
                }
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>


      <View style={styles.btnContainer}>
        <StylizedButton text={`Confirmar Plano ${selectedPlan}`} onPress={handleSubmitPlan} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 20,
    backgroundColor: darkTheme.backgroundPrimary,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  card: {
    backgroundColor: darkTheme.backgroundSecondary,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 0.6,
  },
  backgroundIMG: {
    padding: 20,
  },
  
  cardHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    paddingRight: 10,
    borderRightWidth: 1,
    borderColor: '#fff',
  },
  cardTitleContainer: {
    flex: 1,
    paddingLeft: 13,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  descriptionContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  parcerias: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  btnContainer: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});