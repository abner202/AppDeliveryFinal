import React from 'react';
import { useUserLocal } from '../../hooks/useUserLocal';

 const RolesViewModel = () => {
 
    const{user}=useUserLocal(); //para listar los roles que tiene el user logeado 

    return{
      user
  }
}

export default RolesViewModel;
