import { createSelector } from 'reselect';

import { formValueSelector } from 'redux-form'
import { SEASON_FORM } from './constants'

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