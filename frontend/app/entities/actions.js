import { createRoutineActions } from 'actions'

const createActionTypes = [
    'TRIGGER',
]

const updateActionTypes = [
    'TRIGGER',
]

const deleteActionTypes = [
    'TRIGGER',
]

export const createEntityAction = createRoutineActions('entitiy/CREATE', createActionTypes)
export const updateEntityAction = createRoutineActions('entitiy/UPDATE', updateActionTypes)
export const deleteEntityAction = createRoutineActions('entitiy/DELETE', deleteActionTypes)

export const createEntity = (model, data) => {
    return createEntityAction.trigger({model, data})
}

export const updateEntity = (model, id, data) => {
    return updateEntityAction.trigger({model, id, data})
}

export const deleteEntity = (model, id) => {
    return deleteEntityAction.trigger({model, id})
}