import { createRoutine, createRoutineActions } from 'actions'
import { SEASON_SELECT } from 'season/constants'

const seasonActionsTypes = [
    //'SET_SEASON',
    'ADD_PARCEL',
]

export const listSeasons = createRoutine('season/LIST_SEASONS')
export const loadSeasonDetail = createRoutine('season/DETAIL_SEASON')
export const createSeason = createRoutine('season/CREATE_SEASON')
export const updateSeason = createRoutine('season/UPDATE_SEASON')

export const setSeason = createRoutine('season/SET_SEASON')
export const actionSeason = createRoutineActions('season/ACTION_SEASON', seasonActionsTypes)

export const selectSeason = (seasonId) => ({
    type: SEASON_SELECT,
    payload: { currentSeason: seasonId }
})


