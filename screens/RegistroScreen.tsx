import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/Config'

export default function RegistroScreen({ navigation }: any) {
  const [email, setEmail] = useState("")
  const [contrasenia, setContrasenia] = useState("")
  const [nombre, setNombre] = useState("")  
  const [edad, setEdad] = useState("")      

  const registro = () => {
    if (!email || !contrasenia || !nombre || !edad) {
      Alert.alert("Error", "Por favor, complete todos los campos.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuario creado:", user.uid);
        
        navigation.navigate("Login")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>

      <TextInput
        placeholder="Nombre Completo"
        style={styles.input}
        onChangeText={(text) => setNombre(text)}
        value={nombre}
      />

      <TextInput
        placeholder="Edad"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => setEdad(text)}
        value={edad}
      />

      <TextInput
        placeholder="Ingresar email"
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Ingresar contraseña"
        style={styles.input}
        onChangeText={(text) => setContrasenia(text)}
        value={contrasenia}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={registro}>
          <Text style={styles.buttonText}> Registrarse </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
         <Text style={styles.switchText}>Ya tienes cuenta? Inicai Sesion aquí</Text>
      </TouchableOpacity>      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF4081',  
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: '#FF4081', 
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  input: {
    width: '100%',
    borderWidth: 2,
    margin: 10,
    padding: 12,
    fontSize: 18,
    borderRadius: 8,
    borderColor: '#4CAF50',  
    backgroundColor: 'white',  
    color: '#EAEAEA', 
    textAlign: 'center', 
    boxShadow: 'rgb(255, 255, 255) 0px 0px 10px 5px',  
  },
  switchText: {
    marginTop: 20,
    color: '#FF4081', 
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#FF4081', 
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
})
