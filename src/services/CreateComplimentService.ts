import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UserRespositories } from "../repositories/UserRepositories";



interface ICoplimentRequest{
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService{

    async execute({
        tag_id,
        user_sender, 
        user_receiver, 
        message
    }:ICoplimentRequest){
        const complimentsRepositories = getCustomRepository(
            ComplimentsRepositories
        );
        const usersRepositories = getCustomRepository(UserRespositories);

        if(user_sender === user_receiver){
            throw new Error("Incorrect User Receiver");
        }

        const userReceiverExists = await usersRepositories.findOne(user_receiver);

        if(!userReceiverExists){
            throw new Error("User Receiver dos not exists!");
        }


        const compliment = complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        });

        await complimentsRepositories.save(compliment);

        return compliment;
    }
    
}

export {CreateComplimentService};