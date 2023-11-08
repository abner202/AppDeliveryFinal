import AsyncStorage from '@react-native-async-storage/async-storage';

export const LocalStorage = () => {

    const save = async (key: string, value: string) => {//metodo para guardar
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('ERROR EN LOCAL STORAGE: ' + error);
        }
    }
    
    const getItem = async (key: string) => {//metodo para traer
        try {
            const item = await AsyncStorage.getItem(key);
            return item;
        } catch (error) {
            console.log('ERROR EN LOCAL STORAGE: ' + error);
        }
    }

    const remove = async (key: string) => {//metodo para remover
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log('ERROR EN LOCAL STORAGE: ' + error);
        }
    }

    return {
        save,
        getItem,
        remove
    }

}

