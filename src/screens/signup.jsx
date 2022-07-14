import { View, Text, StyleSheet, Platform, Pressable } from 'react-native'
import React, { useState } from 'react'
import Constants from 'expo-constants';
import Button from '../components/button';
import Input from '../components/input';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../App';
import { collection, addDoc } from "firebase/firestore";
import { showMessage } from "react-native-flash-message";


const genderOptions = ['Male', 'Female'];

export default function Signin({ navigation }) {
    const [gender, setGender] = useState(null);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [loading, setLoading] = useState(false)

    const signup = async () => {
        setLoading(true)
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            // console.log('result ->', result)
            await addDoc(collection(db, "users"), {
                name: name,
                email: email,
                age: age,
                uid: result.user.uid
            });
            // console.log(result.user.uid);
            setLoading(false)
        } catch (error) {
            console.log(error)
            showMessage({
                message: "Error!",
                type: "success",
            });
            setLoading(false)
        }
    }

    return (
        <View style={styles.view}>

            <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
                <Input placeholder='Email address' autoCapitalize='words' onChangeText={(text) => setEmail(text)} />
                <Input placeholder='Password' secureTextEntry onChangeText={(text) => setPassword(text)} />
                <Input placeholder='Full name' onChangeText={(text) => setName(text)} />
                <Input placeholder='Age' onChangeText={(text) => setAge(text)} />

                {/* radio button here */}
                {genderOptions.map((option) => {
                    const selected = option === gender;

                    return (
                        <Pressable style={styles.radioContainer} onPress={() => setGender(option)} key={option}>
                            <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
                                <View style={[styles.innerCircle, selected && styles.selectedInnerCircle]} />
                            </View>
                            <Text style={{ marginLeft: 10 }}>{option}</Text>
                        </Pressable>
                    )
                })}

            </View>

            {/* signup button and bottom text */}
            <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 20 }}>

                <Button onPress={signup} title={"Signup"} customStyles={{ alignSelf: 'center', marginBottom: 40 }} />

                <Pressable onPress={() => navigation.navigate('Signin')}>
                    <Text style={{ textAlign: 'center' }}>Already have an account? {" "}
                        <Text style={{ color: 'green', fontWeight: 'bold' }}>Sign in</Text>
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
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    outerCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderColor: '#cfcfcf',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#cfcfcf',
    },
    selectedOuterCircle: {
        borderColor: 'orange'
    },
    selectedInnerCircle: {
        borderColor: 'orange',
        backgroundColor: 'orange',
    }
})