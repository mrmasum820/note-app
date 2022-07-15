import { View, Text, StyleSheet, Platform, SafeAreaView, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../App';


export default function Home({ navigation, user }) {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        // create query
        const q = query(collection(db, "notes"), where("uid", "==", user.uid));

        const noteListenerSubscription = onSnapshot(q, (querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                list.push(doc.data());
            })
            setNotes(list);
        })

        return noteListenerSubscription;
    }, []);

    // console.log('notes ->', notes);

    const renderItem = ({ item }) => {
        const { title, description, noteColor } = item;
        return (
            <Pressable onPress={() => navigation.navigate('Edit', { item })} style={{ backgroundColor: noteColor, marginBottom: 15, padding: 16, borderRadius: 12 }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>{title}</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{description}</Text>
            </Pressable>
        )
    }

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
            <FlatList
                data={notes}
                renderItem={renderItem}
                keyExtractor={item => item.title}
                contentContainerStyle={{ padding: 20 }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
    }
})