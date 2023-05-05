import {configureStore} from '@reduxjs/toolkit';
import { MensajeInfo, mensajeSlice } from './slices/mensaje';
import { ResourceInfo, resourceSlice } from './slices/resource';

export interface AppStore {
    mensaje: MensajeInfo,
    resource: ResourceInfo
}
export default configureStore<AppStore>({
    reducer: {
        mensaje: mensajeSlice.reducer,
        resource: resourceSlice.reducer,
    }
});