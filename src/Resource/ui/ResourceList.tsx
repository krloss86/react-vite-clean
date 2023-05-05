import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createResource, updateResource } from '../../redux/slices/resource';
import { AppStore } from '../../redux/store';
import ResourcesUseCaseFactory from '../application/uses-case-factory';
import { Config } from '../domain/config';
import Resource from './../domain/resource-entity';
import ResourceItem from './ResourceItem';

const useCase = ResourcesUseCaseFactory.finAll(import.meta.env as unknown as Config);

const ResourceList = () => {
    
    const resourceState = useSelector((store:AppStore) => store.resource);
    
    const dispatcher = useDispatch();
    
    useEffect(()=> {
        useCase.exec().then((data: Resource[]) => {
            dispatcher(createResource({resources: data.map(d=>Resource.toPlain(d))}));
        });
    },[dispatcher])
    
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DESCRIPCIÓN</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        resourceState?.resources?.map(x => <ResourceItem key={x.id} resource={x} />)
                    }
                </tbody>
            </table>
        </>
    )
}

export default ResourceList