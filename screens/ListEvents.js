import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function ListEvents(props) {
  return (
    <ScrollView>
        <TouchableOpacity style={styles.Boton} onPress={()=>props.navigation.navigate('Create')}>
            <Text style={styles.TextoBoton}>Agregar Evento</Text>
        </TouchableOpacity>

        <View>
            <Text style={styles.TextoTitulo}>Lista de los eventos</Text>
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
  TextoTitulo:{
    textAlign:'center',
    marginTop:20,
    marginBottom:10,
    fontSize:20
  },
  TextoNombre:{
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


