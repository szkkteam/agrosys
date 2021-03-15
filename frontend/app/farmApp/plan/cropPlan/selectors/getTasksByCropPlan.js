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

const selector = () => createSelectorOrm(
    schema,
    selectCropPlanRequest,
    (_, season) => season,
    (session, request, cropPlanId) => {
        const { isLoading = true, error = null } = request || {}
        let response = {payload: [], isLoading, error }
        if (isLoading || error || !cropPlanId) return response

        const { Task } = session
        const payload = Task.all()
            .filter(task => task.cropPlanId === cropPlanId)
            .toModelArray()
            .map(task => getIfExists(Task, task.getId()))

        response.payload = payload
        return response
    }
)

export default selector