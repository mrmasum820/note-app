import { View, Text, StyleSheet, Platform, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';

export default function Home({ navigation, user }) {
    const onPressPlus = () => {
        navigation.navigate('Create')
    }

    return (
        <SafeAreaView style={styles.view}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                <Text style={{ fontSize: 20 }}>Create note</Text>
                <Pressable onPress={onPressPlus}>
                    <AntDesign name="pluscircleo" size={24} color="black" />
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
    }
})