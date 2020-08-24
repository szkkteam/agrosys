import { createRoutineActions, createRoutine } from 'actions'

export const mapViewportActionsTypes = [
    // Viewport actions
    'CHANGED',
]

export const mapEventActionsTypes = [
    // Map actions
    'ADD_EVENT',
    'CLEAR_EVENTS',
]

export const mapViewport = createRoutineActions('map/VIEWPORT', mapViewportActionsTypes)
export const mapEvents = createRoutineActions('map/EVENTS', mapEventActionsTypes)