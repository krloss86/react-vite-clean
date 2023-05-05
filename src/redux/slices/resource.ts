import { createSlice, current } from "@reduxjs/toolkit";
import Resource from './../../Resource/domain/resource-entity';

export interface ResourceInfo  {
    resources: Resource[],
}
const ResourceEmptyState: ResourceInfo = {
    resources: [],
}

export const resourceSlice = createSlice({
    name: 'resource',
    initialState: ResourceEmptyState,
    reducers: {
        createResource: (state, action) => {
            return {...ResourceEmptyState, ...action.payload}
        },
        addResource: (state,action) => {
            const currentState = current(state);
            //currentState.resources.push(action.payload);//viene un solo dato 
            return {...state, currentState};
        },
        removeResource: (state, action) => {
            const currentState = current(state);//es una funcion
            const fitlered = currentState.resources.filter(r => r.id !== action.payload.id);
            //currentState.resources = fitlered;
            return {...state,...currentState};
        },
        updateResource: (state,action) => {
            return {...state, ...action.payload};
        },
        resetResource: () =>  {
            return ResourceEmptyState
        }
    }
});


export const {createResource,addResource,removeResource,updateResource, resetResource } = resourceSlice.actions;
export default resourceSlice.reducer;