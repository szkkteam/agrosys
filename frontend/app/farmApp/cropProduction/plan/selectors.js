import { createSelector } from 'reselect';

import { formValueSelector } from 'redux-form'
import { PLAN_FORM_NAME } from './constants'

const formSelector = formValueSelector(PLAN_FORM_NAME)
const productions = (state) => formSelector(state, 'productions')

const dummyCropLookup = {
    1: { title: 'Winter Wheat'}
}

export const getProductionsFromForm = createSelector(
    productions,
    (productions) => {
        console.debug("Productions: ", productions)
        if (!productions) return []
        return productions.map((production, i) => {

            const {cropId, parcels, productionType: type, template} = production

            const crop = dummyCropLookup[cropId].title

            const plannedYield = parcels.reduce((yieldSum, parcel) => {
                return yieldSum + parseInt(parcel?.crop?.yield ?? "0")
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