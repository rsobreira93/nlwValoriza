import { getCustomRepository } from "typeorm";
import { UserRespositories } from "../repositories/UserRepositories";
import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken";


interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService{

    async execute({email, password}: IAuthenticateRequest){
        const userRepositories = getCustomRepository(UserRespositories);

        const user = await userRepositories.findOne({
            email
        });

        if(!user){
            throw new Error("Email/Password incorrect");
        }

        const isPassword = await compare(password, user.password);

        if(!isPassword){
            throw new Error("Email/Password incorrect");
        }

        const token = sign({
            email: user.email
        }, "94c47448f51386073450c44b86ce7367", {
            subject: user.id,
            expiresIn: "1d",
        });

        return token;
    }
}

export { AuthenticateUserService };