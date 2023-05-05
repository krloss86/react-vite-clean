import axios from "axios"
import { ResourceRepository } from "../domain/resource-repository";
import Resource from "../domain/resource-entity";
import ResourceAdapter from "./adapters/resource-adapter";
export default class AxiosResourceRepository implements ResourceRepository {
    constructor(
        private basePath:string,
        private adapter:ResourceAdapter,
    ) {
        this.basePath = basePath;
        this.adapter = adapter;
    }

    /*
     Get all resources as list []
     */
    async findAll(): Promise<Resource[]> {
        const response = await axios.get(`${this.basePath}/unknown`);
        //una vez obtenida la respuesta desde el api externo: adapto la respuesta al modelo de dominio.
        return this.adapter.adapt(response.data)
    }
}