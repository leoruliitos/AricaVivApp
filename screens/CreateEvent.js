import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, Alert, Image, SafeAreaView } from 'react-native';

// Importar firebase
import appFirebase from '../credenciales';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore(appFirebase);

export default function CreateEvent(props) {
  // Creación del modelo
  const initialState = {
    titulo: '',
    fecha: '',
    direccion: '',
    descripcion: '',
  };

  const [state, setState] = useState(initialState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveEvent = async () => {
    try {
      await addDoc(collection(db, 'eventos'), {
        ...state,
      });

      Alert.alert('Alerta', 'Guardado con éxito.');
      props.navigation.navigate('List');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>Crear Evento</Text>

        <View style={styles.inputgroup}>
          <TextInput
            placeholder="Título"
            onChangeText={(value) => handleChangeText(value, 'titulo')}
            value={state.titulo}
          />
        </View>
        <View style={styles.inputgroup}>
          <TextInput
            placeholder="Fecha"
            onChangeText={(value) => handleChangeText(value, 'fecha')}
            value={state.fecha}
          />
        </View>
        <View style={styles.inputgroup}>
          <TextInput
            placeholder="Dirección"
            onChangeText={(value) => handleChangeText(value, 'direccion')}
            value={state.direccion}
          />
        </View>
        <View style={styles.inputgroup}>
          <TextInput
            placeholder="Descripción"
            onChangeText={(value) => handleChangeText(value, 'descripcion')}
            value={state.descripcion}
          />
        </View>
        <Button title="Guardar Evento" onPress={saveEvent} />

        <Image
          style={styles.ImagenMain}
          source={{
            uri: 'https://chileestuyo.cl/wp-content/uploads/2015/07/Arica-y-Costa-Patrimonial.jpg',
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 12,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 35,
  },
  inputgroup: {
    flex: 1,
    padding: 0,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  ImagenMain: {
    width: 300,
    height: 220,
    alignSelf: 'center',
    marginVertical: 20,
  },
});
