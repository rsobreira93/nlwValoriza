import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";


class ListUserReceiverComplimentsService{

    async execute(user_id: string){
        const complimetsRepositoris = getCustomRepository(ComplimentsRepositories);

        const compliments = await complimetsRepositoris.find({
            where: {
                user_receiver: user_id
            },
            relations: ["userSender", "userReceiver", "tag"],
        });

        return compliments;
    }
}

export { ListUserReceiverComplimentsService };