import { useDispatch } from 'react-redux';
import { createResource, resetResource } from '../../redux/slices/resource';
import ResourcesUseCaseFactory from '../application/uses-case-factory';
import { Config } from '../domain/config';
import Resource from '../domain/resource-entity';
import ResourceList from './ResourceList';
import { Button } from 'primereact/button';

const useCase = ResourcesUseCaseFactory.finAll(import.meta.env as unknown as Config);

const ResourcePage = () => {
    const dispatcher = useDispatch();

    const resetResources = () => {
        dispatcher(resetResource());
    }

    const reloadResources = async () => {
        useCase.exec().then((data: Resource[]) => {
            //api  externo > cargar mi store con los datos
            dispatcher(createResource({resources: data.map(d=>Resource.toPlain(d))}));
        });
    }

    return (
        <>
            <div className="container-fluid">
                <div className='row justify-content-center'>
                    <h1 className='text-center'>Resources</h1>
                </div>
                <div className='row'>
                    <div className='col'>
                        <ResourceList/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className='d-flex justify-content-center'>
                            <Button label="Reset State" onClick={resetResources}/>
                            <Button label="Reload State" onClick={reloadResources}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResourcePage;