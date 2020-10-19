import { createSelector as createSelectorReselect } from 'reselect'
import { createSelector as createSelectorOrm } from 'redux-orm';
import { selectSeasonDetail } from 'season/reducers/seasonDetail'
import { selectSeasonStatus } from 'season/reducers/seasonStatus'
import { selectCurrentFarm } from 'farm/selectors'
import orm from 'entities/orm'

export const selectSelectedSeason = (state) => selectSeasonDetail(state).selectedSeason

export const getCurrentSeason = createSelectorOrm(
    [orm, selectSelectedSeason],
    (session, currentSeasonId) => {
        const { Season } = session
        let season = null
        if (Season.hasId(currentSeasonId)) {
            const seasonModel = Season.withId(currentSeasonId)
            season = seasonModel.ref
        } 
        
        return season
    }
)
/*
export const getSeasonList = createSelectorOrm(
    [orm, selectSeasonStatus],
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
*/