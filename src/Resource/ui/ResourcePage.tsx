import { useDispatch } from 'react-redux';
import { createResource, resetResource } from '../../redux/slices/resource';
import ResourcesUseCaseFactory from '../application/uses-case-factory';
import { Config } from '../domain/config';
import Resource from '../domain/resource-entity';
import ResourceList from './ResourceList';

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
            <div >
                <h1>Resources</h1>
                <ResourceList/>            
                <button onClick={resetResources}>
                    Reset State
                </button>
                <button onClick={reloadResources}>
                    ReLoad State
                </button>
            </div>
        </>
    )
}

export default ResourcePage;