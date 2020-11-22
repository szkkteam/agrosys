import { createRoutine, createRoutineActions } from 'actions'


export const productionTemplateActionTypes = [
    'CLEAR',
  ]


export const listProductions = createRoutine('production/LIST_PRODUCTIONS')
export const createProductions = createRoutine('production/CREATE_PRODUCTIONS')
export const loadProductionDetail = createRoutine('production/PRODUCTION_DETAIL')
export const productionTemplate = createRoutineActions('production/PRODUCTION_TEMPLATE', productionTemplateActionTypes)

