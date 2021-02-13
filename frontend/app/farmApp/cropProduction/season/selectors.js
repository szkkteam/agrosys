import { createSelector } from 'reselect'
import { createSelector as createSelectorOrm } from 'redux-orm';
import schema from 'farmApp/schema'

import { selectUserCropRequest } from 'farmApp/cropProduction/crop/reducers/userCropRequest'
import { selectSeasonRequest } from './reducers/seasonRequest'

import { formValueSelector } from 'redux-form'
import { SEASON_FORM } from './constants'


export const getSeasonById = () => createSelectorOrm(
    schema,
    selectUserCropRequest,
    (_, seasonId) => seasonId,
    (session, request, seasonId) => {
        const { isLoading = true, error = null } = request || {}
        let response = {payload: null, isLoading, error }
        if (isLoading || error || (!seasonId)) return response

        const { Season } = session

        if (!Season.idExists(seasonId)) return response

        // TODO: Fetch productions, fieldProductions and related fields also in one shot
        const season = {...Season.withId(seasonId).ref}
        
        response.payload = season
        return response
    }
)






const formSelector = formValueSelector(SEASON_FORM)
const productions = (state) => formSelector(state, 'productions')
const userCropId = (state) => formSelector(state, 'userCropId')

const dummyCropLookup = {
    1: { title: 'Winter Wheat'}
}

export const getProductionsFromForm = createSelector(
    productions,
    userCropId,
    (productions, userCropId) => {
        if (!productions) return []
        return productions.map((production, i) => {

            const {cropId, fields, productionType: type, template} = production

            const crop = dummyCropLookup[cropId].title

            const plannedYield = fields.reduce((yieldSum, field) => {
                return yieldSum + parseInt(field?.crop?.yield ?? "0")
            }, 0)

            // TODO: Lookup for fields sizes
            const size = '35 ha'
            // TODO: Lookup for fields sizes
            const period = '2020 july 5 - 2020 november 30'
            const tasks = 24

            return {
                crop,
                yield: plannedYield,
                type,
                size,
                period,
                tasks,
                production
            }
        })
    },
)