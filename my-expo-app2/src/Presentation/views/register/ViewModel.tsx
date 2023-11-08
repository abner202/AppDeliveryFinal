import React, { useState } from 'react'
import { ApiDelivery } from '../../../Data/sources/remote/api/ApiDelivery';
import { RegisterAuthUseCase } from '../../../Domain/useCases/auth/RegisterAuth';
import * as ImagePicker from 'expo-image-picker';
import { SaveUserLocalUseCase } from '../../../Domain/useCases/userLocal/SaveUserLocal';
import { UserLocalRepository } from '../../../Domain/repositories/UserLocalRepository';
import { useUserLocal } from '../../hooks/useUserLocal';

export const RegisterViewModel = () => {

        const [errorMessage, setErrorMessage] = useState("");
        const [values, setValues] = useState({
          name:"",
          lastname:"",
          phone:"",
          email: "",
          image:"",
          password: "",
          confirmPassword: "",

        });
/*
        const [file, setFile] = useState<ImagePicker.ImagePickerAsset >()//para agg la img del user
       
       
        const pickImage = async ()=> { //para agrergar la imagen a user
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality:1
          });

          if(!result.canceled){
            onChange('image', result.assets[0].uri);
            setFile(result.assets[0]);
          }
        }

        const takePhoto = async ()=> { //para abrir la camara y tomar la fto 
          let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality:1

          });

          if(!result.canceled){
            onChange('image', result.assets[0].uri);
            setFile(result.assets[0]);
          }
        }
*/      
          const [loading,setloading]= useState(false);
          const {user,getUserSession}=useUserLocal();

        const onChange=(property:string, value:any)=>{
            setValues({...values,[property]:value});

        }
        //el async y el await son para peticiones asincronas por lo que no sabemos si el backend nos respondera rapido 
          const register= async () => { //para hacer el registro y la condicional si no funcionara
              if(isValidForm()){

                  setloading(true);
                   // const response=await RegisterWithImageAuthUseCase (values,file!) //guardar datos e imagen ingresada
                  const response= await RegisterAuthUseCase(values as any);
                  setloading(false);
                  console.log("RESULT: " +JSON. stringify(response));
                  if (response.success){
                    await SaveUserLocalUseCase(response.data);
                    getUserSession();
                  }

                  else{
                    setErrorMessage(response.message);
                  }
              }
        }
        //haciendo las restricciones para que los campos no vallan vacios
        
      const isValidForm=(): boolean =>{
        if(values.name === ""){
            setErrorMessage("Ingresa tu nombre")
            return false;
        }
        if(values.lastname === ""){
          setErrorMessage("Ingresa tu apellido")
          return false;
        }
        if(values.email === ""){
          setErrorMessage("Ingresa tu correo electronico")
          return false
        }
        if(values.phone === ""){
          setErrorMessage("Ingresa tu telefono")
          return false;
        }
        if(values.password === ""){
          setErrorMessage("Ingresa tu contraseña")
          return false;
        }
        if(values.confirmPassword=== ""){
          setErrorMessage("Ingresa la confirmación de la contraseña")
          return false;
         }
         if(values.password !== values.confirmPassword){
          setErrorMessage("Las contraseñas no coinciden")
          return false;
         }
        /*if(values.image === ''){
          setErrorMessage("Selecciona una imagen")
          return false;
        }*/

          return true;
      }
      return {

        ...values,
        onChange,
        register,
        errorMessage,
        user,
        loading
       
       

        
      }
}

  export default RegisterViewModel;
  
