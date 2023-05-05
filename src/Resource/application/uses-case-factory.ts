import { Config } from "../domain/config";
import RepositoryFactory from "../infrastructure/repository-factory";
import DeleteResource from "./delete";
import FindAllResources from "./findAll";
import UpdateResource from "./update";

export default class ResourcesUseCaseFactory {
    
    static finAll = (config:Config) => {
        return new FindAllResources (
            RepositoryFactory.axiosResourceRepository(
                config
            )
        );
    }

    static updateResource = (config:Config) => {
        return new UpdateResource (
            RepositoryFactory.localResourceRepository(
                config
            )
        );
    }   

    static deleteResource = (config:Config) => {
        return new DeleteResource (
            RepositoryFactory.localResourceRepository(
                config
            )
        );
    }  
}