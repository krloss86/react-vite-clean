import { IAdapter } from "../../domain/adapter";
import Resource from "../../domain/resource-entity";
import { ExternalResource } from "../external-resources";

export default class ResourceAdapter implements IAdapter<Resource[]> {
    adapt(externalResource: ExternalResource): Resource[] {
        const array = externalResource.data;
        return array.map(data => new Resource(
            data.id,
            data.name,
            data.color,
        ));
    }
}