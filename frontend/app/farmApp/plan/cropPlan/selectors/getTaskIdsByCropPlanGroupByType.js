import { createSelector } from 'reselect'
import { createSelector as createSelectorOrm } from 'redux-orm';
import schema from 'farmApp/schema'

import { selectCropPlanRequest } from '../reducers/cropPlanRequest'

const getIfExists = (model, id, fallback=null) => {
    if (model.idExists(id)) {
        const { ref } = model.withId(id)    
        return {...ref}
    } else {
        return fallback
    }
}


export const groupBy = (list, keyGetter) => {
        const map = new Map();
        list.forEach((item) => {
             const key = keyGetter(item);
             const collection = map.get(key);
             if (!collection) {
                 map.set(key, [item]);
             } else {
                 collection.push(item);
             }
        });
        return map;
}

export default () => createSelectorOrm(
    schema,
    selectCropPlanRequest,
    (_, cropPlanIds) => cropPlanIds,
    (session, request, cropPlanIds) => {
        const { isLoading = true, error = null } = request || {}
        let response = {payload: new Map(), isLoading, error }
        if (isLoading || error || (!cropPlanIds) || Array.isArray(cropPlanIds).length === 0) return response

        const { Task } = session        

        let array = []
        if (Array.isArray(cropPlanIds)) {
            array = Task.all()
            .filter(task => cropPlanIds.includes(task.cropPlanId))
            .toModelArray()
            .map(task => getIfExists(Task, task.getId()))

        } else {
            array = Task.all()
            .filter(task => cropPlanIds === task.cropPlanId)
            .toModelArray()
            .map(task => getIfExists(Task, task.getId()))
        }
        console.debug("Array: ", array)

        // TODO: Group by type
        response.payload = groupBy(array, (task => task.type)) 
        return response
    }
)