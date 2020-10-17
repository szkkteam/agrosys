import { createSelector } from 'reselect'
import { selectCurrentFarm } from 'farm/reducers/farmDetail'
import orm from 'entities/orm'

export const getSelectedFarm = createSelector(
    [orm, selectCurrentFarm],
    (session, currentFarmId) => {
        const { Farm } = session
        let farm = null
        if (Farm.hasId(currentFarmId)) {
            const farmModel = Farm.withId(currentFarmId)
            farm = farmModel.ref
        } 
        
        return farm
    }
)