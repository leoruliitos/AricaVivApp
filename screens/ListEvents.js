import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

//importar firebase
import appFirebase from '../credenciales'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoct} from 'firebase/firestore'
import { useEffect, useState } from 'react';

const db = getFirestore(appFirebase)

export default function ListEvents(props) {
    const [lista, setLista] = useState([])
    useEffect(()=>{
        const getLista = async()=>{
            try {
                const querySnapshot = await getDocs(collection(db, 'eventos'))
                const docs = []
                querySnapshot.forEach((doc)=>{
                    const {titulo, fecha, direccion, descripcion} = doc.data()
                    docs.push({
                        id:doc.id,
                        titulo,
                        fecha,
                        direccion,
                        descripcion
                    })
                })
                setLista(docs);
            } catch (error) {
                console.log(error);
            }
        }
        getLista()
    },[lista])
    return(
    <ScrollView>
        <TouchableOpacity style={styles.Boton} onPress={()=>props.navigation.navigate('Create')}>
            <Text style={styles.TextoBoton}>Agregar Evento</Text>
        </TouchableOpacity>

        <View>
            <Text style={styles.TextoCebezera}>Lista de los eventos</Text>
        </View>

        <View>
            {
                lista.map((list)=>(
                    <TouchableOpacity key={list.id} style={styles.BotonLista}
                    onPress={()=>props.navigation.navigate('Show', {eventoId:list.id})}>
                        <Text style={styles.TextoTitulo}>{list.titulo}</Text>
                    </TouchableOpacity>
                ))
            } 
        </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Boton:{
    backgroundColor: 'cyan',
    height:35,
    borderColor:'black',
    borderWidth:1
  },
  TextoBoton:{
    fontSize:18,
    textAlign:'center'
  },
  TextoCebezera:{
    textAlign:'center',
    marginTop:20,
    marginBottom:10,
    fontSize:20
  },
  TextoTitulo:{
    fontSize:16
  },
  BotonLista:{
    backgroundColor: '#DDDDDD',
    borderBottomWidth:1,
    borderBottomColor:'#cccccc',
    marginBottom:3,
    padding:5
  }
});


