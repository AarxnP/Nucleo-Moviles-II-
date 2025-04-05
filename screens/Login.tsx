import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  function login() {
    if (!email || !contrasenia) {
      Alert.alert('Error', 'Por favor, ingresa un correo y una contraseña.');
      return;
    }

    signInWithEmailAndPassword(auth, email, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('Drawer');
      })
      .catch((error) => {
        let errorMessage = 'Ocurrió un error al iniciar sesión.';
        if (error.code === 'auth/wrong-password') errorMessage = 'Contraseña incorrecta.';
        else if (error.code === 'auth/user-not-found') errorMessage = 'No existe una cuenta con este correo.';
        Alert.alert('Error', errorMessage);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder='Correo electrónico'
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        keyboardType='email-address'
        autoCapitalize='none'
      />

      <TextInput
        placeholder='Contraseña'
        style={styles.input}
        onChangeText={setContrasenia}
        value={contrasenia}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
        <Text style={styles.switchText}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white', 
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FF4081', 
    marginBottom: 40,
    textAlign: 'center',
    textShadowColor: '#FF4081', 
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 8,
  },
  input: {
    width: '100%',
    padding: 14,
    borderWidth: 2,
    borderColor: '#4CAF50', 
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: 'white', 
    fontSize: 16,
    color: 'black', 
    textAlign: 'center',
    boxShadow: 'rgb(255, 255, 255) 0px 0px 8px 4px', 
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
  switchText: {
    marginTop: 20,
    color: '#FF4081', 
    fontSize: 14,
    fontWeight: '500',
  },
});
