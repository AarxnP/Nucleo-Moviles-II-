import { Alert, Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

export default function Tarjeta(props: any) {  
  //console.log(props.datos.titulo);

  const [modalVisible, setmodalVisible] = useState(false)

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => setmodalVisible(true)}
    >
      <Text style={styles.nameText}>{props.datos.titulo}</Text>
      <Image source={{ uri: props.datos.imagen }} style={styles.img} />

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text style={styles.nameText}>{props.datos.plataforma}</Text>
          <Text style={styles.nameText}>{props.datos.precio}</Text>
            <Image source={{ uri: props.datos.imagen }} style={styles.img} />
            <Button title='Cerrar' onPress={() => setmodalVisible(false)} />
          </View>
        </View>
      </Modal>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  nationalityText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Fondo semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    marginTop: 10,
  },
});
