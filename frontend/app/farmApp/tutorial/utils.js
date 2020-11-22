import { injectReducer } from 'utils/async'

console.log("require reducer: ", require('./reducer'))
console.log("inject reducer: ", injectReducer(require('./reducer')))

export const withReducers = [
    injectReducer(require('./reducer'))
]