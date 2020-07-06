import { createRoutineActions, createRoutine } from 'actions'


export const createFieldActionTypes = [
    'DRAW_STARTED',
    'DRAW_DONE',
  ]
  

export const createFieldShape = createRoutineActions('field/CREATE_FIELD_SHAPE', createFieldActionTypes)
export const listSoilTypes = createRoutine('soils/LIST_SOILS')
export const createFields = createRoutine('field/CREATE_FIELD')