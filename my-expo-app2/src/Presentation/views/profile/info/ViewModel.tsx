import React from 'react';
import { RemoveUserLocalUseCase } from '../../../../Domain/useCases/userLocal/RemoveUserLocal';


export const ProfileInfoViewModel = () => {

    const removeSesion=async () =>{
        await RemoveUserLocalUseCase();
    }
    return{
        removeSesion
    }
}

export default ProfileInfoViewModel