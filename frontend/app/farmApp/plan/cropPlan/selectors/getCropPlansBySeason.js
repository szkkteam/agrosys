import { createSelector } from 'reselect'
import { createSelector as createSelectorOrm } from 'redux-orm';
import schema from 'farmApp/schema'

import { selectCropPlanRequest } from '../reducers/cropPlanRequest'


const selector = () => createSelectorOrm(
    schema,
    selectCropPlanRequest,
    (_, season) => season,
    (session, request, season) => {
        const { isLoading = true, error = null } = request || {}
        let response = {payload: [], isLoading, error }
        if (isLoading || error) return response

        const { CropPlan } = session
        const payload = CropPlan.all()
            .filter(cropPlan => cropPlan.season === season)
            .toModelArray()
            .map(cropPlan => cropPlan.getId())

        response.payload = payload
        return response
    }
)

export default selector