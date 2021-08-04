import { getCustomRepository } from "typeorm";
import { UserRespositories } from "../repositories/UserRepositories";
import {hash} from "bcryptjs";

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {

    async execute({name, email, admin = false, password} : IUserRequest){
        const userRepository = getCustomRepository(UserRespositories);

        if(!email){
            throw new Error("E-mail incorrect");
        }

        const userAlreeadyExists = await userRepository.findOne({
            email
        });

        if(userAlreeadyExists){
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password,8);

        const user = userRepository.create({
            name,
            email,
            admin,
            password: passwordHash,
        });

        await userRepository.save(user);

        return user;
    }
}

export { CreateUserService };