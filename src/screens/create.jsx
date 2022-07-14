import { View, Text, SafeAreaView, StyleSheet, Platform, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Constants, { UserInterfaceIdiom } from 'expo-constants';
import Input from '../components/input';
import Button from '../components/button';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../App';

const noteColorOptions = ['red', 'blue', 'green'];

export default function Create({ navigation, user }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [noteColor, setNoteColor] = useState('blue')
    const [loading, setLoading] = useState(false)

    const onPressSubmit = async () => {
        setLoading(true)
        try {
            await addDoc(collection(db, "notes"), {
                title: title,
                description: description,
                noteColor: noteColor,
                uid: user.uid
            });
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.view}>
            <View style={{ marginHorizontal: 16, marginVertical: 20 }}>
                <Input placeholder="Title" autoCapitalize='none' onChangeText={(text) => setTitle(text)} />
                <Input
                    placeholder='Description'
                    onChangeText={(text) => setDescription(text)}
                    multiline={true}
                />

                {
                    noteColorOptions.map((option, index) => {
                        const selected = option === noteColor;

                        return (
                            <Pressable style={styles.radioContainer} onPress={() => setNoteColor(option)} key={index}>
                                <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
                                    <View style={[styles.innerCircle, selected && styles.selectedInnerCircle]} />
                                </View>
                                <Text style={{ marginLeft: 10 }}>{option}</Text>
                            </Pressable>
                        )
                    })
                }

            </View>

            {loading ? (
                <ActivityIndicator />
            ) : (
                <Button customStyles={{ width: '90%', alignSelf: 'center' }} title="submit" onPress={onPressSubmit} />
            )}

        </SafeAreaView>
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