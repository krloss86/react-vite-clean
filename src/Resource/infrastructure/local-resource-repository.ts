import Resource from "../domain/resource-entity";
import { ResourceDataSource } from "../domain/resource-repository";
export default class LocalResourceDataSource implements ResourceDataSource {
    constructor(
        private dataSource:Resource[]
    ) {
        this.dataSource = dataSource;
    }

    find(): Resource[] {
        return this.dataSource;
    }

    add(resource: Resource): Resource[] {
        this.dataSource.push(resource);
        return this.dataSource;
    }
    
    update(id:number, resource:Resource):Resource[] {

        if(!this.dataSource)
            throw new Error('Resource was not defined');

        // const obj = this.dataSource.find(d => d.id === id);
        const clone =  [...this.dataSource];

        const idx = clone.findIndex(d => d.id === id);

        //this.dataSource[idx] = {...resource};
        clone.splice(idx,1,resource);

        return clone;
    }

    delete(id:number): Resource[] {
        if(!this.dataSource)
            throw new Error('Resource was not defined');
        
            const filtered = this.dataSource.filter(d => d.id !== id);

        this.dataSource = [...filtered];

        return this.dataSource;
    }
}