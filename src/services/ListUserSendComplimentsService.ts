import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";


class ListUsersendComplimentsService{

    async execute(user_id: string){
        const complimetsRepositoris = getCustomRepository(ComplimentsRepositories);

        const compliments = await complimetsRepositoris.find({
            where: {
                user_sender: user_id
            },
        });

        return compliments;
    }
}

export { ListUsersendComplimentsService };