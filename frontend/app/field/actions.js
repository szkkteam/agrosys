import { createRoutineActions } from 'actions'


export const createFieldActionTypes = [
    'DRAW_STARTED',
    'DRAW_DONE',
  ]
  

export const createFieldShape = createRoutineActions('fields/CREATE_FIELDS_SHAPE', createFieldActionTypes)
//export const createFieldShape = createRoutine('fields/CREATE_FIELDS_SHAPE')