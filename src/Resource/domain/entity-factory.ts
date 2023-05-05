import { ExternalData, ExternalResource } from '../infrastructure/external-resources';
import Resource from './resource-entity';

export default class EntityFactory {
    /**
     * 
     * @param {} externalResource 
     * @returns List of Resource
     */
    static resourceEntity = (externalResource: ExternalData) => {
        return new Resource(
            externalResource.id,
            externalResource.name
        );
    }
    static listResourceEntity = (externalResources:ExternalResource) => {
        const array = externalResources.data;
        return array.map(data => new Resource(
                data.id,
                data.name
            )
        )
    }
}