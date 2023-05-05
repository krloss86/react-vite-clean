import { useDispatch, useSelector } from 'react-redux';
import { updateResource } from '../../redux/slices/resource';
import { AppStore } from '../../redux/store';
import ResourcesUseCaseFactory from '../application/uses-case-factory';
import { Config } from '../domain/config';
import Resource from './../domain/resource-entity';

//interfaz propia de la ui
export interface ResourceItemProps {
    key: number
    resource: Resource
}

const ResourceItem = (props: ResourceItemProps) => {
    const resourceState = useSelector((store:AppStore) => store.resource);

    const dispatcher = useDispatch();

    const updateOneResource = (resource: Resource) => {
        //update resource data
        resource = {...resource, descripcion:'new color'};
        //get use case
        const updateUseCase = ResourcesUseCaseFactory.updateResource({dataSource: resourceState.resources} as unknown as Config);

        //invoke use case by passing params
        const resources = updateUseCase.exec({id:resource.id, resource: resource});
        //dispatch new ACTION over redux and update the state
        dispatcher(updateResource({resources:resources}));
    }
    
    const deleteOneResource = async (resource: Resource) => {
        const deleteUseCase = ResourcesUseCaseFactory.deleteResource({dataSource: resourceState.resources} as unknown as Config);
        const resources = deleteUseCase.exec({id:resource.id});
        dispatcher(updateResource({resources: resources}));
    }
    
    return (
        <tr>
            <td>
                {props.resource.id}
            </td>
            <td>
                {props.resource.descripcion}
            </td>
            <td>
                <button onClick={() => updateOneResource(props.resource)}>
                    Update Descripcion
                </button>
                <button onClick={() => deleteOneResource(props.resource)}>
                    Delete it
                </button>
            </td>
        </tr>
    )
}
export default ResourceItem