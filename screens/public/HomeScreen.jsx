import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { darkTheme } from '../../styles/global.js'; // Importa o tema desejado

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Introdução */}
      <View style={styles.intro}>
        <View style={styles.introText}>
          <Text style={styles.title}>A vantagem do futuro começa aqui.</Text>
          <Image
            source={require('../../assets/logo-decorator.png')}
            style={styles.logoDecorator}
          />
        </View>
        <Image
          source={require('../../assets/grafo.png')}
          style={styles.grafo}
          resizeMode="contain"
        />
      </View>

      {/* Benefícios */}
      <View style={styles.benefits}>
        <Text style={styles.subtitle}>Conheça nossos serviços</Text>
        <View style={styles.benefitsList}>
          <BenefitCard
            image={require('../../assets/currency-exchange.svg')}
            description="A troca origina um ciclo infindável de possibilidades."
            title="Conta-corrente"
          />
          <BenefitCard
            image={require('../../assets/money.svg')}
            description="Quanto mais você usa sua conta, mais você ganha."
            title="Programa de cashback"
          />
          <BenefitCard
            image={require('../../assets/money-bag.svg')}
            description="Na Node Bounty valorizamos a confiança que nos é depositada."
            title="Simulador de CDI"
          />
        </View>
      </View>

      {/* Conta e Cartão */}
      <View style={styles.card}>
        <View style={styles.cardText}>
          <Text style={styles.subtitle}>Conta corrente, cartão e investimentos</Text>
          <Text style={styles.description}>
            Para acompanhar e apoiar sua aascensão onde estiver.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Cadastrar')}>
            <Text style={styles.buttonText}>Abra sua conta</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/card.png')}
          style={styles.cardImage}
          resizeMode="contain"
        />
      </View>

      {/* Patrocinadores */}
      <View style={styles.sponsors}>
        <Text style={styles.subtitle}>Apoio</Text>
        <View style={styles.sponsorLogos}>
          <Image
            source={require('../../assets/fundacaoFAT.png')}
            style={styles.sponsorLogo}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/bancoBrasil.png')}
            style={styles.sponsorLogo}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/fatec.png')}
            style={styles.sponsorLogo}
            resizeMode="contain"
          />
        </View>
      </View>
    </ScrollView>
  );
}

// Componente de benefício
const BenefitCard = ({ image, description, title }) => (
  <View style={styles.benefitCard}>
    <Image source={image} style={styles.benefitIcon} />
    <Text style={styles.benefitDescription}>{description}</Text>
    <Text style={styles.benefitTitle}>{title}</Text>
  </View>
);

// Estilos
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: darkTheme.background,
  },

  // Seção de introdução
  intro: {
    alignItems: 'center',
    marginBottom: 40,
  },
  introText: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: darkTheme.text,
  },
  logoDecorator: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  grafo: {
    width: '100%',
    height: 200,
  },

  // Seção de benefícios
  benefits: {
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: darkTheme.text,
  },
  benefitsList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  benefitCard: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  benefitIcon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  benefitDescription: {
    textAlign: 'center',
    fontSize: 14,
    color: darkTheme.text,
    marginBottom: 8,
  },
  benefitTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: darkTheme.primary,
  },

  // Seção de conta e cartão
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  cardText: {
    flex: 1,
    marginRight: 16,
  },
  description: {
    fontSize: 14,
    color: darkTheme.text,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: darkTheme.text,
    fontWeight: 'bold',
  },
  cardImage: {
    width: 120,
    height: 80,
  },

  // Seção de patrocinadores
  sponsors: {
    alignItems: 'center',
  },
  sponsorLogos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  sponsorLogo: {
    marginHorizontal:10,
    width: 80,
    height: 40,
  },
});
