import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "@rneui/base";
import { darkTheme } from "../styles/global";

export default function TransacaoItem({ trade }) {
    const [tradeType, setTradeType] = React.useState(null);
    const [icon, setIcon] = React.useState(null);

    React.useEffect(() => {
        if (trade && trade.transacao) {
            if (trade.transacao.emissor && trade.transacao.receptor) {
                setTradeType("Transferência");
                setIcon("swap-horizontal");
            } else if (trade.role === 'saida') {
                setTradeType("Saque");
                setIcon("arrow-top-left-thin");
            } else {
                setTradeType("Deposito");
                setIcon("arrow-bottom-right-thin");
            }
        }
    }, [trade]);

    if (!trade || !trade.transacao) {
        return null;
    }

    function formatarData(dataISO) {
        const data = new Date(dataISO);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    function formatarValor(valor) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
    }

    console.log(trade.transacao.emissor, trade.transacao.receptor);

    return (
        <View style={styles.container}>
            <Icon name={icon} size={30} type="material-community" color={
                tradeType === "Transferência" ? "#fff" : tradeType === "Saque" ? "red" : "green"
            } />
            <View style={styles.textContainer}>
                <Text style={styles.Title}>{tradeType}</Text>
                <Text style={styles.dataText}>{formatarData(trade.transacao.dataTransacao)}</Text>
            </View>
            <Text style={styles.Value}>{formatarValor(trade.transacao.valorTransacao)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomColor: "#ccc",
    },
    textContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    Title: {
        fontSize: 16,
        color: darkTheme.textSecondary,
    },
    Value: {
        fontSize: 16,
        color: darkTheme.textPrimary,
    },
    dataText: {
        fontSize: 12,
        color: darkTheme.textSecondary,
    }
});