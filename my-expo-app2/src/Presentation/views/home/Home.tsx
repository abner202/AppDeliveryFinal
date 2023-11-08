import React, {useState,useEffect } from "react"
import { useNavigation } from '@react-navigation/native';
import { Image, View, Text, TextInput, ToastAndroid, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { RootStackParamList } from '../../../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import useViewModel from "./ViewModel"
import { CustomTextInput } from "../../components/CustomTextInput";
import styles from "./Styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

interface Props extends NativeStackScreenProps<RootStackParamList, 'HomeScreen'>{};

    export const HomeScreen = ({navigation, route}:Props) => {

    const{email,password,errorMessage,onChange, login, user}=useViewModel();
    

    useEffect(() => {
      if(errorMessage !=="")
      {  //ToastAndroid.show(errorMessage,ToastAndroid.LONG)//android
       Alert.alert(errorMessage); //ios 
       }
      }, [errorMessage])

    
      useEffect(() => {//para pasar a la pantalla de ProfileInfoScreen
      if(user?.id !== null && user?.id !==undefined){
         if (user.roles.length!>1){ //hacemos la validacion si tiene mas de un rol
          navigation.replace('RolesScreen');
         }
         else{
          navigation.replace('ProfileInfoScreen');
         }  
      }

      }, [user])
      



    return (

        <View style={styles.container}>
              <Image
              source={require('../../../../assets/chef.jpg')}
              style={styles.imageBackground}
              />
        
              <View style={styles.logoConteiner}>
                  <Image
                  source={require('../../../../assets/logo.png')}
                  style={styles.logoImage}
                  />
                  <Text style={styles.logoTex}>FOOD APP</Text>
              </View>
        
        
              <View style={styles.form}>
        
                <Text style={styles.formTex}>INGRESAR</Text>
        
                <CustomTextInput 
                    image={require('../../../../assets/email.png')}
                    placeholder="Correo electrinico"
                    keyboardType="email-address"
                    property="email"
                    onChangeText={onChange}
                    value={email}
                
                />

                <CustomTextInput 
                    image={require('../../../../assets/password.png')}
                    placeholder="Contraseña"
                    keyboardType="default"
                    property="password"
                    onChangeText={onChange}
                    value={password}
                    secureTextEntry={true}
              
                />
              

                  <View style={{marginTop:30 }}>

                      <RoundedButton text='ENTRAR' onPress={()=> login() }/>

                  </View>
                
                      <View style={styles.formRegister}>
                        <Text>No tienes cuenta ?</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate("RegisterScreen")}>
                        <Text style={styles.formRegisterText}>Registrate?</Text>
                        </TouchableOpacity>
                  </View>
                
        
              </View>
    
        </View>
    
      )
    }
    
    
