import { injectReducer } from 'utils/async'

export const withReducers = [
    injectReducer(require('./reducer'))
]