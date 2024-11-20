import { Button, Icon } from "@rneui/base";
import React from "react";
import { TouchableHighlight, StyleSheet } from "react-native";

const VisibilityBtn = ({ visible, toggleVisibility }) => {
    return (
        <TouchableHighlight onPress={toggleVisibility} style={styles.container}>
            <Icon name={visible ? 'visibility' : 'visibility-off'} size={20} color='#FFFFFF' />
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
        borderRadius: 50
    }
})

export default VisibilityBtn;