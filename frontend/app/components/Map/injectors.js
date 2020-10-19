import { injectReducer, injectSagas } from 'utils/async'

export const withReducerMap = injectReducer(require('components/Map/reducer'))

export const withReducers = [
    withReducerMap
]