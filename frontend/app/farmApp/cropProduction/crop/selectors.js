import { createSelector } from 'reselect'
import { createSelector as createSelectorOrm } from 'redux-orm';
import schema from 'farmApp/schema'

import { selectCropTypeRequest } from './reducers/cropTypeRequest'


export const getCropTypes = createSelectorOrm(
    schema,
    selectCropTypeRequest,
    (session, request) => {
        const { isLoading = true, error = null } = request || {}
        let response = {payload: [], isLoading, error }
        if (isLoading || error) return response

        const { CropType } = session
        const payload = CropType.all().toModelArray().map(cropType => {
            const { ref } = cropType
            return {
                ...ref,
            }
            //cropType.getId()
        })
        response.payload = payload
        return response
    }
)
