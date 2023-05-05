export default class Resource {
    constructor(
        public id:number, 
        public descripcion:string) {        
    }

    static toPlain(r: Resource): any {
        return {...r};
    }
}