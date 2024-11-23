import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Dimensions } from "react-native";
import { Icon } from "@rneui/base";

import { darkTheme } from "../styles/global.js";

export default function StylizedButton({ text, onPress, icon }) {
    return (
        <TouchableHighlight onPress={onPress} style={styles.button}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>{text}</Text>
                </View>
                <View>
                    {icon && <Icon name={icon} size={20} color={darkTheme.textPrimary} style={styles.icon} />}
                </View>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: darkTheme.backgroundSecondary,
        borderRadius: 10,
        borderColor: darkTheme.textSecondary,
        borderWidth: 1,
        width: Dimensions.get("window").width * 0.8,
        margin: 5,
        alignContent: "center",
        justifyContent: "space-around",
    },
    container: {
        width: Dimensions.get("window").width * 0.75,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: '#000',
    },
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: darkTheme.textPrimary,
        fontSize: 16,
        marginRight: 10,
    },
});