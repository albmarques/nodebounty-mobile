import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';

export function UnitExtract({ data, owner }) {
  const generatePDF = async () => {
    try {
      Alert.alert('PDF', 'Função para gerar PDF implementada!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível gerar o PDF.');
    }
  };

  const formatarValor = (number) => {
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const formatarCPF = (cpf) => {
    return cpf.replace(/^(.{3})(.*)(.{2})$/, (_, first, middle, last) => {
      const asteriscos = first.replace(/./g, '*');
      const ultimosDigitos = last.replace(/./g, '*');
      return `${asteriscos}${middle}${ultimosDigitos}`;
    });
  };

  const formatarValorSignal = (number) => {
    const valorFormatado = formatarValor(number);
    if (data?.transacao?.emissor === null || data?.transacao?.receptor?.cliente?.idCliente === owner) {
      return { value: `+${valorFormatado}`, style: styles.valorGreen };
    } else if (data?.transacao?.receptor === null || data?.transacao?.emissor?.cliente?.idCliente === owner) {
      return { value: `-${valorFormatado}`, style: styles.valorRed };
    }
  };

  const getTransactionIcon = () => {
    if (data.transacao.emissor === null) {
      return <Icon name="bank-plus" size={30} color="#34A853" />;
    } else if (data.transacao.receptor === null) {
      return <Icon name="bank-minus" size={30} color="#EA4335" />;
    } else {
      return <Icon name="bank-transfer" size={30} color="#4285F4" />;
    }
  };

  return (
    <View style={styles.transacaoContainer}>
      <View style={styles.transacao}>
        {/* Data e PDF Button */}
        <View style={styles.header}>
          <Text style={styles.data}>{dayjs(data.transacao.dataTransacao).format('DD/MM/YYYY')}</Text>
          <TouchableOpacity onPress={generatePDF} style={styles.pdfButton}>
            <Icon name="file-pdf-box" size={24} color="#757575" />
          </TouchableOpacity>
        </View>

        {/* Descrição e Valor */}
        <View style={styles.box}>
          {getTransactionIcon()}
          <Text style={styles.descricaoTexto}>
            {data.transacao.emissor === null
              ? `Depósito`
              : data.transacao.receptor === null
              ? 'Saque'
              : 'Transferência'}
            {data.transacao.emissor && data.transacao.receptor && (
              <>
                {data.transacao.emissor.cliente.idCliente === owner && (
                  <> enviada para {data.transacao.receptor.cliente.nome}</>
                )}
                {data.transacao.receptor.cliente.idCliente === owner && (
                  <> recebida de {data.transacao.emissor.cliente.nome}</>
                )}
              </>
            )}
          </Text>
          <Text style={[styles.valor, formatarValorSignal(data.transacao.valorTransacao).style]}>
            {formatarValorSignal(data.transacao.valorTransacao).value}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  transacaoContainer: {
    marginVertical: 12,
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  transacao: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  data: {
    fontSize: 14,
    color: '#757575',
    fontWeight: 'bold',
  },
  descricaoTexto: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginLeft: 12,
    flexWrap: 'wrap',
    maxWidth: '80%',
  },
  box: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  valor: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#000',
  },
  valorGreen: {
    color: '#34A853',
  },
  valorRed: {
    color: '#EA4335',
  },
  pdfButton: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
