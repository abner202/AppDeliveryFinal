import { UserLocalRepositoryImpl } from "../../../Data/repositories/UserLocalRepository";
import { User } from "../../entities/User";

const { remove } = new UserLocalRepositoryImpl();

export const RemoveUserLocalUseCase = async () => {//caso de uso 
    return await remove();
}