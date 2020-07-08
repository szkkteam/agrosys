import { createRoutineActions, createRoutine } from 'actions'

export const mapEditFeatureActionsTypes = [
    // Feature edit actions
    'DRAW_REQUESTED',
    'DRAW_STARTED',
    'DRAW_FINISHED',
    'FEATURE_MODIFIED',
    'CLEAR',
  ]

export const mapViewportActionsTypes = [
    // Viewport actions
    'CHANGED',
]

export const mapEventActionsTypes = [
    // Map actions
    'ADD_EVENT',
    'CLEAR_EVENTS',
]


export const mapEdit = createRoutineActions('map/EDIT_FEATURE', mapEditFeatureActionsTypes)
export const mapViewport = createRoutineActions('map/VIEWPORT', mapViewportActionsTypes)
export const mapEvents = createRoutineActions('map/EVENTS', mapEventActionsTypes)