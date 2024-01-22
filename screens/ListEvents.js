import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';

// Importar firebase
import appFirebase from '../credenciales';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore(appFirebase);

export default function ListEvents(props) {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'eventos'));
        const docs = [];
        querySnapshot.forEach((doc) => {
          const { titulo, fecha, direccion, descripcion } = doc.data();
          docs.push({
            id: doc.id,
            titulo,
            fecha,
            direccion,
            descripcion,
          });
        });
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, [lista]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.TextoCebezera}>Lista de los eventos</Text>

        <View style={styles.eventosContainer}>
          {lista.map((list) => (
            <TouchableOpacity
              key={list.id}
              style={styles.BotonLista}
              onPress={() => props.navigation.navigate('Show', { eventoId: list.id })}
            >
              <Text style={styles.TextoTitulo}>{list.titulo}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Image
          style={styles.ImagenMain}
          source={{
            uri:
              'https://chileestuyo.cl/wp-content/uploads/2021/08/morro-de-arica.jpg',
          }}
        />

        <TouchableOpacity style={styles.Boton} onPress={() => props.navigation.navigate('Create')}>
          <Text style={styles.TextoBoton}>Agregar Evento</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  eventosContainer: {
    flex: 1,
  },
  Boton: {
    backgroundColor: 'cyan',
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  TextoBoton: {
    fontSize: 18,
  },
  TextoCebezera: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
  },
  TextoTitulo: {
    fontSize: 16,
  },
  BotonLista: {
    backgroundColor: '#DDDDDD',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginBottom: 3,
    padding: 10,
    borderRadius: 8,
  },
  ImagenMain: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginVertical: 20,
  },
});