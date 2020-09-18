import { createRoutine, createRoutineActions } from 'actions'

const templateActionsTypes = [
    'SELECT_TEMPLATE',
]

export const listUserTemplates = createRoutine('template/LIST_USER_TEMPLATES')
export const listDefaultTemplates = createRoutine('template/LIST_DEFAULT_TEMPLATES')
export const createTemplate = createRoutine('template/CREATE_TEMPLATE')
export const updateTemplate = createRoutine('template/UPDATE_TEMPLATE')

export const actionTemplate = createRoutineActions('template/ACTION_TEMPLATE', templateActionsTypes)