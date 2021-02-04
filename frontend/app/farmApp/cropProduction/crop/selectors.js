import { createSelector } from 'reselect'
import { createSelector as createSelectorOrm } from 'redux-orm';
import schema from 'farmApp/schema'

import { selectCropTypeRequest } from './reducers/cropTypeRequest'
import { selectUserCropRequest } from './reducers/userCropRequest'


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

export const getUserCropIds = createSelectorOrm(
    schema,
    selectUserCropRequest,
    (session, request) => {
        const { isLoading = true, error = null } = request || {}
        let response = {payload: [], isLoading, error }
        if (isLoading || error) return response

        const { UserCrop } = session
        const payload = UserCrop.all().toModelArray().map(userCrop => userCrop.getId())
           
        response.payload = payload
        return response
    }
)


export const getUserCrops = createSelectorOrm(
    schema,
    selectUserCropRequest,
    (session, request) => {
        const { isLoading = true, error = null } = request || {}
        let response = {payload: [], isLoading, error }
        if (isLoading || error) return response

        const { UserCrop } = session
        const payload = UserCrop.all().toModelArray().map(userCrop => {
            const { ref } = userCrop
            return {
                ...ref,
            }
            //cropType.getId()
        })
           
        response.payload = payload
        return response
    }
)