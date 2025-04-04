import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/Config'

export default function WelcomeScreen( {navigation}: any ) {
  const [email, setemail] = useState("")
  const [contrasenia, setcontrasenia] = useState("")

  function login() {
    signInWithEmailAndPassword(auth, email, contrasenia)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigation.navigate("Drawer")
        console.log(user.uid);
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorCode, errorMessage)
      });

  }


  return (
    <View>
      <Text>Welcome - LOGIN</Text>

      <TextInput
        placeholder='Ingresar email'
        style={styles.input}
        onChangeText={(texto) => setemail(texto)}
        value={email}
      />

      <TextInput
        placeholder='Ingresar contrasenia'
        style={styles.input}
        onChangeText={(texto) => setcontrasenia(texto)}
        value={contrasenia}
      />

      <Button title='login' onPress={()=> login()}/>

    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    margin: 10,
    fontSize: 20
  }
})