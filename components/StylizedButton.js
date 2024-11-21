import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Dimensions } from "react-native";
import { Icon } from "@rneui/base";

import { darkTheme } from "../styles/global.js";

export default function StylizedButton({ text, onPress, icon }) {
    return (
        <TouchableHighlight onPress={onPress} style={styles.button}>
            <View style={styles.content}>
                <Text style={styles.text}>{text}</Text>
                {icon && <Icon name={icon} size={20} color={darkTheme.textPrimary} style={styles.icon} />}
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
    },
    content: {
        flexGrow: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: darkTheme.textPrimary,
        fontSize: 16,
        marginRight: 10,
    },
});