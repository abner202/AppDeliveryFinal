import React, { useState, useEffect } from 'react';
import { LoginAuthUseCase } from '../../../Domain/useCases/auth/LoginAuth';
import { SaveUserLocalUseCase } from '../../../Domain/useCases/userLocal/SaveUserLocal';
import { GetUserLocalUseCase } from '../../../Domain/useCases/userLocal/GetUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';

const HomeViewModel = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const[values,setValues]=useState({
        email:"",
        password:"",
    });

    
    const{user, getUserSession}=useUserLocal();//para trael la informacion del hook
    console.log('USUARIO DE SESION: ' + JSON.stringify(user));
    

    const onChange=(property:string , value:any)=>{

        setValues({...values, [property]:value});
    }
    
    const login=async()=>{ //haciendo uso del login
        if(isValidForm()){
        const response= await LoginAuthUseCase(values.email, values.password);
        console.log("RESPONSE: "+ JSON.stringify(response));

        if(!response.success){
            setErrorMessage(response.message);
        }
        else{
            await SaveUserLocalUseCase(response.data); //almacenando la sesion de user
            getUserSession();
        }

      }
    }

    const isValidForm=():boolean=>{ //validaciones para que se llenen los campos de login
        if(values.email === ""){
            setErrorMessage('Ingresa el correo electronico');
            return false;
        }
        
        if(values.password === ""){
            setErrorMessage('Ingresa la contraseña');
            return false;
        }

        return true;
    }

    return{
        ...values,
         user,
         onChange,
         login, 
         errorMessage

    }
}


export default HomeViewModel;
