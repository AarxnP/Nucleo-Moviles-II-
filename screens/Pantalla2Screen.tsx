import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Tarjeta from '../components/Tarjeta';

export default function Pantalla2Screen() {
  const [data, setData] = useState([])

  useEffect(() => {
    
    getData()
   // console.log(data);
    
  }, [])
    
  const getData = async () => {
    try {
      const resp = await fetch('https://jritsqmet.github.io/web-api/videojuegos.json');
      const json = await resp.json();
      setData(json.videojuegos);
      //console.log(data);


      
    } catch (err) {
      console.error(err);
    }
  }
    
  return (
    <View>
      <FlatList 
        data={data}
        renderItem={ ( { item } ) => 
        <Tarjeta datos = { item } />
      }
      />
    </View>

  )
}

const styles = StyleSheet.create({})