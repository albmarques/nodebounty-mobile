import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { darkTheme } from "../styles/global";

export default function StylizedLoading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={darkTheme.textPrimary} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: darkTheme.backgroundPrimary,
    },
});