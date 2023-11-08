import { UserLocalRepositoryImpl } from "../../../Data/repositories/UserLocalRepository";
import { User } from "../../entities/User";

const { save } = new UserLocalRepositoryImpl();

export const SaveUserLocalUseCase = async (user: User) => {//caso de uso 
    return await save(user);
}