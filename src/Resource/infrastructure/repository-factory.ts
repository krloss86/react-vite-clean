import { Config } from "../domain/config";
import ResourceAdapter from "./adapters/resource-adapter";
import AxiosResourceRepository from './axios-resource-repository';
import LocalResourceDataSource from "./local-resource-repository";
/*
Interfaces generica para la configuracion: se construye desde la capa de UI usando por ejemplo .env
*/
export default class RepositoryFactory {
    static axiosResourceRepository = (config:Config) => {
        return new AxiosResourceRepository(
                //EN ESTE PUNTO CONOZCO QUE DEPENDENCIA USA EL REPOSITORIO
                config['VITE_REQ_API'] as string,
                new ResourceAdapter(), 
        );
    }

    static localResourceRepository = (config:Config) => {
        return new LocalResourceDataSource(
                //EN ESTE PUNTO CONOZCO QUE DEPENDENCIA USA EL REPOSITORIO
                config.dataSource as []
        );
    }
}