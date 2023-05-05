import { ResourceRepository } from "../domain/resource-repository";

export default class FindAllResources {
    constructor(
        private resourceReposiroty:ResourceRepository
    ) {    }

    async exec() {
        return await this.resourceReposiroty.findAll();
    }
}