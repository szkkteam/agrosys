import { combineReducers } from 'redux'

import cropTypesRequestReducer, { KEY as cropTypesRequestReducerKey } from './cropTypesRequest'
import userCropRequestReducer, { KEY as userCropRequestReducerKey } from './userCropRequest'

export default combineReducers({
    [cropTypesRequestReducerKey]: cropTypesRequestReducer,
    [userCropRequestReducerKey]: userCropRequestReducer,
})
