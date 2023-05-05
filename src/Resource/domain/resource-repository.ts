import Resource from "./resource-entity";

export interface ResourceRepository {
    findAll(): Promise<Resource[]>;
    // update(id:number, resource: Resource): Resource[];
    // delete(id:number): Resource[];
}

export interface ResourceDataSource {
    find(): Resource[];
    update(id:number, resource: Resource): Resource[];
    delete(id:number): Resource[];
    add(resource:Resource): Resource[];
}