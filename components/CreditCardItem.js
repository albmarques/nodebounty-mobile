// CreditCardItem.js
import React, { useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';

import { darkTheme, planos } from '../styles/global.js';
import { Header, Icon } from '@rneui/base';
import VisibilityBtn from './VisibityBtn.js';

const { width } = Dimensions.get('window');

function formatCardNumber(number) {
    return number.replace(/(\d{4})(?=\d)/g, '$1 ');
}

function formatExpiryDate(date) {
    const [year, month] = date.split('-');
    return `${month}/${year.slice(2)}`;
}


export default function CreditCardItem({ cartao, plano, ...rest }) {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    return (
        <View
            key={cartao.idCartao}
            style={[styles.CardContainer, {
                borderColor: plano === 'Beauty' ? planos.beauty :
                    plano === 'Tech' ? planos.tech : planos.health
            }]}
        >
            <ImageBackground
                source={plano === 'Tech' ? require('../assets/BG/TechBG.png') : plano === 'Beauty' ? require('../assets/BG/BeautyBG.png') : require('../assets/BG/HealthBG.png')}
                style={styles.bgImage}
            >
                <View style={styles.CardSubContainer}>
                    <View style={styles.CardLogoContainer}>
                        <Image
                            source={require('../assets/cardsLogo/Logo.png')}
                            style={styles.bandeiras}
                        />
                        <VisibilityBtn visible={visible} toggleVisibility={toggleVisibility} />
                        <Image
                            source={require('../assets/cardsLogo/MasterCard.png')}
                            style={styles.masterCardLogo}
                        />
                    </View>
                    <View style={styles.CardTextContainer}>
                        <View style={styles.subContainer1}>
                            <Text style={styles.headerText}>Numero</Text>
                            <Text style={styles.headerText}>Validade</Text>
                        </View>
                        <View style={styles.subContainer1}>
                            <Text style={styles.CardText}>{visible ? formatCardNumber(cartao.numeroCartao) : '••••••• •••• •••• ••••'}</Text>
                            <Text style={styles.CardText}>{formatExpiryDate(cartao.validadeCartao)}</Text>
                        </View>
                        <View style={styles.subContainer1}>
                            <Text style={styles.headerText}>CVC</Text>
                        </View>
                        <View style={styles.subContainer2}>
                            <Text style={styles.CardText}>{visible ? cartao.cvcCartao : '•••'}</Text>

                            <TouchableHighlight onPress={rest.onDelete} style={{ borderRadius: 5 }}>
                                <View style={styles.btnContainer}>
                                    <Text style={styles.btnText}>Deletar Cartão</Text>
                                    <Icon name='delete' color='#fff' size={18} />
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    CardContainer: {
        backgroundColor: darkTheme.backgroundSecondary,
        margin: 10,
        borderRadius: 10,
        borderWidth: 0.6,
        borderColor: darkTheme.textPrimary,
        flex: 1,
        width: width * 0.94,
    },
    newCardSubContainer: {
        alignItems: 'center',
    },
    CardLogoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    CardTextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    CardText: {
        color: darkTheme.textPrimary,
        fontSize: 16,
        fontWeight: '300',
    },
    bandeiras: {
        height: 30,
        width: 50,
        resizeMode: 'contain',
    },
    masterCardLogo: {
        height: 20,
        width: 30,
        resizeMode: 'contain',
    },
    headerText: {
        color: darkTheme.textSecondary,
        fontSize: 12,
    },
    subContainer1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    subContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
        gap: 5,
    },
    btnText: {
        justifyContent: 'center',
        alignItems: 'center',
        color: darkTheme.textPrimary,
        fontSize: 12,
    },
    bgImage: {
        borderRadius: 10,
        padding: 10,
        width: width * 0.94,
        flex: 1,
    },
});