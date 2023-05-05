import Resource from "../domain/resource-entity";
import { ResourceDataSource } from "../domain/resource-repository";

export interface DeleteCommand {
    id: number
}
export default class DeleteResource {
    constructor(private repository:ResourceDataSource){
        this.repository = repository;
    }

    exec(cmd: DeleteCommand):Resource[] {
        return this.repository.delete(cmd.id);
    }
}