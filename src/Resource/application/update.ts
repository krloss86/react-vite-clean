import Resource from "../domain/resource-entity";
import LocalResourceDataSource from "../infrastructure/local-resource-repository";

export interface UpdateCommand {
    id: number,
    resource: Resource
}

export default class UpdateResource {
    constructor(
        private repository:LocalResourceDataSource
        ) {}

    exec(cmd: UpdateCommand) {
        return this.repository.update(cmd.id, cmd.resource);
    }
}