import { createRoutine, createRoutineActions } from 'actions'

const DOMAIN = 'block'

export const SHOW_CREATE_MODAL = `${DOMAIN}/SHOW_CREATE_MODAL`

export const showCreateModal = () => ({
    type: SHOW_CREATE_MODAL,
    payload: { }    
})

