import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


//Importar los componentes
import ListEvents from './screens/ListEvents';
import CreateEvent from './screens/CreateEvent';
import ShowEvent from './screens/ShowEvent';

export default function App() {

  const Stack = createStackNavigator();

  function MyStack(){
    return(
      <Stack.Navigator>
      <Stack.Screen name="List" component={ListEvents}/>
      <Stack.Screen name="Create" component={CreateEvent}/>
      <Stack.Screen name="Show" component={ShowEvent}/>
    </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


