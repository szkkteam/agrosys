import { createSelector as createSelectorReselect } from 'reselect'
import { createSelector as createSelectorOrm } from 'redux-orm';
import { selectFarmDetail } from 'farm/reducers/farmDetail'
import { selectFarmStatus } from 'farm/reducers/farmStatus'
import orm from 'entities/orm'

export const selectCurrentFarm = (state) => selectFarmDetail(state).selectedFarm

export const getCurrentFarm = createSelectorOrm(
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

export const getFarmList = createSelectorOrm(
    [orm, selectFarmStatus],
    (session, status) => {
        const { isLoading } = status
        let response = { data: [], isLoading } 

        if (isLoading) return response
        const { Farm } = session
        const farms = Farm.all().toModelArray().map(farmModel => farmModel.getId())
        response.data = farms
        return response
    }
)

export const getFarmListOld = createSelectorOrm(
    [orm, selectFarmStatus],
    (session, status) => {
        const { isLoading } = status
        let response = { data: [], isLoading } 

        if (isLoading) return response
        const { Farm } = session
        const farms = Farm.all().toRefArray()
        response.data = farms
        return response
    }
)