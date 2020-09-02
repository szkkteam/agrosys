import { createRoutine, createRoutineActions } from 'actions'

const parcelActionsTypes = [
    'ADD_PARCEL',
]

export const listSeasonParcel = createRoutine('parcel/LIST_SEASON_PARCELS')

export const createParcel = createRoutine('parcel/CREATE_PARCELS')
export const updateParcel = createRoutine('parcel/UPDATE_PARCELS')

export const actionParcel = createRoutineActions('parcel/ACTION_PARCEL', parcelActionsTypes)