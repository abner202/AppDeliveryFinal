import { User } from "../entities/User";

export interface UserLocalRepository {
    save(user: User): Promise<void>;//para obtener la informacion
    getUser(): Promise<User>;//para obtener el usuario 
    remove(): Promise<void>;// para retornar pantalla
}