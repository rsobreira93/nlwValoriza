import { EntityRepository, Repository } from "typeorm";
import {Tag} from "../entities/Tag";

@EntityRepository(Tag) /**Parei no minuto 28:03 da aula 03 */
class TagsRepositories extends Repository<Tag>{}

export { TagsRepositories };