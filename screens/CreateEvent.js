import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, Alert} from 'react-native';

//importar firebase
import appFirebase from '../credenciales'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoct} from 'firebase/firestore'

const db = getFirestore(appFirebase)

export default function CreateEvent(props) {
    //Creacion modelo
    const initialState = {
        titulo:'',
        fecha:'',
        direccion:'',
        descripcion:''
    }

    const[state, setState] = useState(initialState)

    const handleChangeText = (value, name)=>{
        setState({...state, [name]:value})
    }

    const saveEvent = async()=>{
        try{
            await addDoc(collection(db, 'eventos'),{
                ...state
            })

            Alert.alert('Alerta', 'Guardado con éxito.')
            props.navigation.navigate('List')
        }catch{
            console.error(error)
        }

        //console.log(state)
    }

  return ( //Vistas para ingresar los datos
    <ScrollView style={styles.container}>
        <Text style={styles.titulo}>Crear Evento</Text>

        <View style={styles.inputgroup}>
            <TextInput placeholder='Título' onChangeText={(value)=>handleChangeText(value, 'titulo')} value={state.titulo}/>
        </View>
        <View style={styles.inputgroup}>
            <TextInput placeholder='Fecha' onChangeText={(value)=>handleChangeText(value, 'fecha')} value={state.fecha}/>
        </View>
        <View style={styles.inputgroup}>
            <TextInput placeholder='Dirección' onChangeText={(value)=>handleChangeText(value, 'direccion')} value={state.direccion}/>
        </View>
        <View style={styles.inputgroup}>
            <TextInput placeholder='Descripción' onChangeText={(value)=>handleChangeText(value, 'descripcion')} value={state.descripcion}/>
        </View>
        <Button title='Guardar Evento' onPress={saveEvent}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    titulo:{
      textAlign:'center',
      fontSize:18,
      marginTop:12,
      marginBottom:20
    },  
    container:{
      flex:1,
      padding:35
    },  
    inputgroup:{
      flex:1,
      padding:0,
      marginBottom:20,
      borderBottomWidth:1,
      borderBottomColor:'#cccccc'
    },
});
  


