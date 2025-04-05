import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { ref, set, get } from 'firebase/database';
import { auth, db } from '../config/Config';
import { onAuthStateChanged } from 'firebase/auth';

// Definir tipos para los datos de los juegos
interface Juego {
  game: string;
  score: number;
  date: string;
}

export default function Pantalla1Screen() {
  const [id, setid] = useState<string>("");
  const [game, setGame] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [date, setDate] = useState<string>("");

  // Variables para almacenar los cálculos
  const [totalScore, setTotalScore] = useState<number>(0);
  const [highestScore, setHighestScore] = useState<number>(0);
  const [averageScore, setAverageScore] = useState<number>(0);
  const [totalGames, setTotalGames] = useState<number>(0);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setid(uid);
        obtenerDatosUsuario(uid); 
      }
    });
  }, []);

 
  function guardar() {
    set(ref(db, 'usuarios/' + id + "/juegos/" + Date.now()), {
      game: game,
      score: score,
      date: date
    });
  }

  function obtenerDatosUsuario(userId: string) {
    get(ref(db, 'usuarios/' + userId + '/juegos'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const juegos: Record<string, Juego> = snapshot.val();
          let total = 0;
          let highest = 0;
          let count = 0;

          Object.values(juegos).forEach((juego: Juego) => {
            const puntaje = juego.score;
            total += puntaje;
            highest = Math.max(highest, puntaje);
            count++;
          });

          setTotalScore(total);
          setHighestScore(highest);
          setTotalGames(count);
          setAverageScore(count > 0 ? total / count : 0); 
        }
      })
      .catch((error) => {
        console.log("Error al obtener los datos del usuario:", error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guardar Información</Text>

      <TextInput
        placeholder='ID de usuario'
        style={styles.input}
        onChangeText={(texto) => setid(texto)}
        value={id}
        editable={false}
      />

      <TextInput
        placeholder='Nombre del juego'
        style={styles.input}
        onChangeText={(texto) => setGame(texto)}
        value={game}
      />

      <TextInput
        placeholder='Puntaje'
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(texto) => setScore(+texto)}
        value={score.toString()}
      />

      <TextInput
        placeholder='Fecha'
        style={styles.input}
        onChangeText={(texto) => setDate(texto)}
        value={date}
      />

      <Button title='Guardar' onPress={() => guardar()} color="#4CAF50" />

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Puntaje Total: {totalScore}</Text>
        <Text style={styles.statsText}>Puntaje Más Alto: {highestScore}</Text>
        <Text style={styles.statsText}>Puntaje Promedio: {averageScore.toFixed(2)}</Text>
        <Text style={styles.statsText}>Total de Juegos: {totalGames}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  input: {
    width: '100%',
    marginBottom: 15,
    borderWidth: 1,
    fontSize: 18,
    padding: 12,
    borderColor: '#888',
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  statsContainer: {
    marginTop: 30,
  },
  statsText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
});
