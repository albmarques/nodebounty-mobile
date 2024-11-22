import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { Icon } from "@rneui/base";
import { TextInputMask } from "react-native-masked-text";
import { Dimensions } from "react-native";

import { darkTheme } from "../styles/global";

export default function StylizedInput({ label, placeholder, value, onChangeText, secureTextEntry, icon, errors, maskType, optionsMask, ...rest }) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputContainer}>
                <View style={styles.inputContainer2}>
                    {icon && <Icon name={icon} size={20} color={darkTheme.textPrimary} style={styles.icon} />}
                    <TextInputMask
                        type={maskType}
                        options={optionsMask}
                        style={styles.input}
                        placeholder={placeholder}
                        value={value}
                        onChangeText={onChangeText}
                        secureTextEntry={secureTextEntry}
                        placeholderTextColor={darkTheme.textSecondary}
                        {...rest}
                    />
                </View>
            </View>
            {errors && <Text style={styles.errorMessage}>{errors}</Text>}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    label: {
        color: darkTheme.textPrimary,
        marginBottom: 5,
    },
    inputContainer: {
        alignItems: "center",
        borderColor: darkTheme.textPrimary,
        borderWidth: 1,
        borderRadius: 10,
        padding: 3,
        width: Dimensions.get("window").width * 0.8,
    },
    inputContainer2: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: darkTheme.input,
        width: Dimensions.get("window").width * 0.78,
        borderRadius: 8,
        padding: 5,
    },
    input: {
        backgroundColor: darkTheme.input,
        color: darkTheme.textPrimary,
        padding: 10,
        borderRadius: 5,
        flex: 1,
    },
    errorBorder: {
        borderBottomColor: 'red', // Cor da borda em caso de erro
    },
    errorMessage: {
        marginTop: 5,
        fontSize: 12,
        color: 'red', // Cor da mensagem de erro
    },
});