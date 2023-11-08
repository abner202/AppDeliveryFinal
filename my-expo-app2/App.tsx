import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { HomeScreen } from './src/Presentation/views/home/Home';
import { RegisterScreen } from './src/Presentation/views/register/Register';
import { ProfileInfoScreen } from './src/Presentation/views/profile/info/ProfileInfo';
import { RolesScreen } from './src/Presentation/views/roles/Roles';

export type RootStackParamList={//para ver permitir los tipos de datos que pueden recibor las pantallas
  HomeScreen:undefined,
  RegisterScreen:undefined,
  ProfileInfoScreen:undefined,
  RolesScreen:undefined,

}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerShown: false //para ocultar el encabezado de homeScreen
        }}>
       
            
            <Stack.Screen //mando a llamar a la pantalla de inicio>
            name="HomeScreen"
            component={HomeScreen}/>

            <Stack.Screen //mando a llamar a la pantalla de registro
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
              headerShown:true,
              title:"Nuevo Usuario"
            }}/>

            <Stack.Screen //mando a llamar a la pantalla de profileInfo
            name="ProfileInfoScreen"
            component={ProfileInfoScreen}/>  
            
            <Stack.Screen //mando a llamar a la pantalla de roles
            name="RolesScreen"
            component={RolesScreen}
            options={{
              headerShown:true,
              title:"Selecciona un rol"
            }}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App; 