import { createRoutine, createRoutineActions } from 'actions'

export const listUserTemplates = createRoutine('template/LIST_USER_TEMPLATES')
export const listDefaultTemplates = createRoutine('template/LIST_DEFAULT_TEMPLATES')
export const createTemplate = createRoutine('template/CREATE_TEMPLATE')