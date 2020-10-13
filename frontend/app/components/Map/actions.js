import { createRoutineActions, createRoutine } from 'actions'

const mapViewportActionsTypes = [
    // Viewport actions
    'CHANGED',
]

const mapEventActionsTypes = [
    // Map actions
    'ADD',
    'CLEAR',
]

const mapEditActionTypes = [
    'START',
    'CANCEL',
    'SUBMIT',
]

export const mapViewport = createRoutineActions('map/VIEWPORT', mapViewportActionsTypes)
export const mapEvents = createRoutineActions('map/EVENTS', mapEventActionsTypes)
export const mapEdit = createRoutineActions('map/EDIT', mapEditActionTypes)