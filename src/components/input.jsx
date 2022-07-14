import { StyleSheet, TextInput } from 'react-native'
import React from 'react'

export default function Input({ placeholder, secureTextEntry, onChangeText, autoCapitalize, multiline }) {
    return (
        <TextInput
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            style={styles.input}
            autoCapitalize={autoCapitalize}
            multiline={multiline}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 20,
    }
})