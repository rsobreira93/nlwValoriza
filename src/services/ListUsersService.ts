import { getCustomRepository } from "typeorm";
import { UserRespositories } from "../repositories/UserRepositories";
import {classToPlain} from "class-transformer";



class ListUsersService{

    async execute(){
        const userRepositories = getCustomRepository(UserRespositories);

        const users = await userRepositories.find();

        return classToPlain(users);
    }
}

export {ListUsersService};