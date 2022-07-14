import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home';
import Create from './src/screens/create';
import Edit from './src/screens/edit';
import Signin from './src/screens/signin';
import Signup from './src/screens/signup';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import FlashMessage from "react-native-flash-message";
import { useEffect, useState } from 'react';


const firebaseConfig = {
  apiKey: "AIzaSyCVoWFBnkmAU8jdLCEIsX0eBlJL4af1x9Y",
  authDomain: "note-app-c7aba.firebaseapp.com",
  projectId: "note-app-c7aba",
  storageBucket: "note-app-c7aba.appspot.com",
  messagingSenderId: "656968333033",
  appId: "1:656968333033:web:4140688e3cd407dc062278"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  }
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   signOut(auth)
  // }, [])

  useEffect(() => {
    const authSubscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setLoading(false)
      }
      else {
        setUser(null)
        setLoading(false)
      }
    })

    return authSubscription
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color='blue' size='large' />
      </View>
    )
  }

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" options={{ headerShown: false }}>
              {(props) => <Home {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Create">
              {(props) => <Create {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Edit" component={Edit} />
          </>
        ) : (
          <>
            <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}

      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
