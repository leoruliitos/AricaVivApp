import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import appFirebase from '../credenciales';
import { getFirestore, collection, deleteDoc, doc, getDoc } from 'firebase/firestore';

const db = getFirestore(appFirebase);

export default function ShowEvent(props) {
  const [event, setEvent] = useState({});
  const getOneEvent = async (id) => {
    try {
      const docRef = doc(db, 'eventos', id);
      const docSnap = await getDoc(docRef);
      setEvent(docSnap.data());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOneEvent(props.route.params.eventoId);
  }, []);

  const deleteEvent = async (id) => {
    await deleteDoc(doc(db, 'eventos', id));
    Alert.alert('Alerta', 'Evento eliminado con éxito');
    props.navigation.navigate('List');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>Informacion del Evento</Text>
        <Text style={styles.sub}>Título: {event.titulo}</Text>
        <Text style={styles.sub}>Fecha: {event.fecha}</Text>
        <Text style={styles.sub}>Dirección: {event.direccion}</Text>
        <Text style={styles.sub}>Información: {event.descripcion}</Text>
        <TouchableOpacity
          style={styles.BotonLista}
          onPress={() => deleteEvent(props.route.params.eventoId)}>
          <Text style={styles.TextoNombre}>Eliminar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={[
          {
            key: 'imageKey',
            uri:
              'https://chilemosaico.cl/eventos/wp-content/uploads/2023/02/Carnaval-Andino-con-la-Fuerza-del-Sol-Arica-2024.jpg',
          },
        ]}
        renderItem={({ item }) => (
          <Image style={styles.ImagenMain} source={{ uri: item.uri }} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
  },
  sub: {
    fontSize: 16,
  },
  TextoNombre: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  BotonLista: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 15,
    alignSelf: 'center',
    marginTop: 20,
  },
  ImagenMain: {
    width: '100%',
    height: 120,
    marginBottom: 20,
  },
});
