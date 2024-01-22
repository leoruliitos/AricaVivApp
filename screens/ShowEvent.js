import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

//importar firebase
import appFirebase from '../credenciales'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoct} from 'firebase/firestore'
import { useEffect, useState } from 'react';

const db = getFirestore(appFirebase)

export default function ShowEvent(props) {

    const [event, setEvent] = useState({})
    const getOneEvent = async(id)=>{
        try{
            const docRef = doc(db, 'eventos', id)
            const docSnap = await getDoc(docRef)
            setEvent(docSnap.data())
        }catch{
           console.error(error) 
        }
    }

    useEffect(()=>{
        getOneEvent(props.route.params.eventoId)
    },[])

  return (
    <View>
      <Text style={styles.titulo}>Informacion del Evento</Text>

      <Text style={styles.sub}>Título: {event.titulo}</Text>
      <Text style={styles.sub}>Fecha: {event.fecha}</Text>
      <Text style={styles.sub}>Dirección: {event.direccion}</Text>
      <Text style={styles.sub}>Información: {event.descripcion}</Text>

      <TouchableOpacity style={styles.BotonLista}>
        <Text style={styles.TextoNombre}>Eliminar</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    titulo:{
      textAlign:'center',
      marginTop:10,
      marginBottom:10,
      fontSize:20
    },
    sub:{
      fontSize:16
    },
    
    TextoNombre:{
      fontSize:16,
      textAlign:'center',
      color:'white',
      
    },
    BotonLista:{
      backgroundColor:'red',
      borderBottomWidth:1,
      borderBottomColor:'#cccccc',
      marginBottom:3,
      padding:5,
      marginTop:5
    }
  })

