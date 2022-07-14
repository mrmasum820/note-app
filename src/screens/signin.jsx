import { View, Text, Image, StyleSheet, Platform, Pressable } from 'react-native'
import React, { useState } from 'react'
import Constants from 'expo-constants';
import Button from '../components/button';
import Input from '../components/input';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../App';

export default function Signin({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const signin = async () => {
        setLoading(true)
        try {
            signInWithEmailAndPassword(auth, email, password)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <View style={styles.view}>
            <Image
                source={require('../../assets/signin.jpg')}
                style={{ alignSelf: 'center', width: 300, height: 200 }}
            />
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Never forget your notes</Text>

            <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
                <Input placeholder="Email address" autoCapitalize='none' onChangeText={(text) => setEmail(text)} />
                <Input
                    placeholder='Password'
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                />
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 20 }}>

                <Button onPress={signin} title={"Signin"} customStyles={{ alignSelf: 'center', marginBottom: 40 }} />

                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={{ textAlign: 'center' }}>Don't have an account? {" "}
                        <Text style={{ color: 'green', fontWeight: 'bold' }}>Sign up</Text>
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
    }
})