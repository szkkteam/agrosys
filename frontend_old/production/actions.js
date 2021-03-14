import { createRoutine, createRoutineActions } from 'actions'
/*
const templateActionsTypes = [
    'SELECT_TEMPLATE',
    'SELECT_STATE',
]
*/

export const listProductions = createRoutine('production/LIST_PRODUCTIONS')
export const listParcelProductions = createRoutine('production/LIST_PARCEL_PRODUCTIONS')

//export const actionTemplate = createRoutineActions('template/ACTION_TEMPLATE', templateActionsTypes)