import { createSelector } from 'reselect'
import { createSelector as createSelectorOrm } from 'redux-orm';
import schema from 'farmApp/schema'

import { selectCropPlanRequest } from '../reducers/cropPlanRequest'

export default () => createSelectorOrm(
    schema,
    selectCropPlanRequest,
    (_, cropPlanId) => cropPlanId,
    (session, request, cropPlanId) => {
        const { isLoading = true, error = null } = request || {}
        let response = {payload: null, isLoading, error }
        if (isLoading || error) return response
        
        const { CropPlan } = session
        if (CropPlan.idExists(cropPlanId)) {
            response.payload = CropPlan.withId(cropPlanId).toJSON()
        } 

        return response
    }
)
