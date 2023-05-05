import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createResource, updateResource } from '../../redux/slices/resource';
import { AppStore } from '../../redux/store';
import ResourcesUseCaseFactory from '../application/uses-case-factory';
import { Config } from '../domain/config';
import Resource from './../domain/resource-entity';
import thisStyle from './Resource.module.css';

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';

const useCase = ResourcesUseCaseFactory.finAll(import.meta.env as unknown as Config);

const ResourceList = () => {
    
    const resourceState = useSelector((store:AppStore) => store.resource);
    
    const dispatcher = useDispatch();
    
    useEffect(()=> {
        useCase.exec().then((data: Resource[]) => {
            dispatcher(createResource({resources: data.map(d=>Resource.toPlain(d))}));
        });
    },[dispatcher])
    
    const deleteOneResource = async (resource: Resource) => {
        const deleteUseCase = ResourcesUseCaseFactory.deleteResource({dataSource: resourceState.resources} as unknown as Config);
        const resources = deleteUseCase.exec({id:resource.id});
        dispatcher(updateResource({resources: resources}));
        showInfo();
    }
    
    const updateOneResource = (resource: Resource) => {
        //update resource data
        resource = {...resource,
             descripcion:'new color',
             color:'#blue'
        };
        //get use case
        const updateUseCase = ResourcesUseCaseFactory.updateResource({dataSource: resourceState.resources} as unknown as Config);

        //invoke use case by passing params
        const resources = updateUseCase.exec({id:resource.id, resource: resource});
        //dispatch new ACTION over redux and update the state
        dispatcher(updateResource({resources:resources}));
        showSuccess();
    }

    const actionsButtons = (resource: Resource) => {        
        return <>
            <Button label="Update" raised onClick={() => updateOneResource(resource)}/>
            <Button label="Delete It" raised onClick={() => deleteOneResource(resource)}/>
        </>
    };

    const toast = useRef(null);
    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
    }
    const showInfo = () => {
        toast.current.show({severity:'info', summary: 'Info', detail:'Message Content', life: 3000});
    }

    return (
        <section className={thisStyle.resourceContainer}>
            <DataTable value={resourceState.resources}>
                <Column field="id" header="ID"/>
                <Column field="descripcion" header="Desctipcion"/>
                <Column field="color" header="Color"/>
                <Column body={actionsButtons}/>
            </DataTable>
            <Toast ref={toast} />
        </section>
    )
}

export default ResourceList