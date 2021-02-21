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

export const getUserCrop = () => createSelectorOrm(
    schema,
    selectUserCropRequest,
    (_, cropId) => cropId,
    (session, request, cropId) => {
        const { isLoading = true, error = null } = request || {}
        let response = {payload: null, isLoading, error }
        if (isLoading || error) return response

        let payload = null

        const { UserCrop } = session
        if (UserCrop.idExists(cropId)) {
            const userCrop = UserCrop.withId(cropId)    
            const { ref } = userCrop 
            payload = {...ref}
        }
        
        response.payload = payload
        return response
    }
)


export const getCurrentSeasonByUserCropId = () => createSelectorOrm(
    schema,
    selectUserCropRequest,
    (_, userCropId) => userCropId,
    (session, request, userCropId) => {
        const { isLoading = true, error = null } = request || {}
        let response = {payload: null, isLoading, error }
        if (isLoading || error || (!userCropId)) return response


        const { Season, UserCrop } = session        
        // TODO: Perform more filter based on tasks date and actual date
        // TODO: Fetch productions, fieldProductions and related fields also in one shot
        const season = Season.all().filter({userCropId}).toRefArray()[0] || null
        //const season = {...ref}
        console.debug("getCurrentSeasonByUserCropId-userCropId: ", userCropId)                
        console.debug("getCurrentSeasonByUserCropId-season: ", season)                
        response.payload = season
        return response
    }
)

