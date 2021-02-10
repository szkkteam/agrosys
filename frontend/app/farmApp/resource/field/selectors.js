import { createSelector } from 'reselect'
import { createSelector as createSelectorOrm } from 'redux-orm';
import schema from 'farmApp/schema'

import { selectFieldRequest } from './reducers/fieldRequest'


export const getFieldIds = createSelectorOrm(
    schema,
    selectFieldRequest,
    (session, request) => {
        const { isLoading = true, error = null } = request || {}
        let response = {payload: [], isLoading, error }
        if (isLoading || error) return response

        const { Field } = session
        const payload = Field.all().toModelArray().map(field => field.getId())
           
        response.payload = payload
        return response
    }
)


export const getField = () => createSelectorOrm(
    schema,
    selectFieldRequest,
    (_, fieldId) => fieldId,
    (session, request, fieldId) => {
        const { isLoading = true, error = null } = request || {}
        let response = {payload: null, isLoading, error }
        if (isLoading || error) return response

        let payload = null

        const { Field } = session
        if (Field.idExists(fieldId)) {
            const field = Field.withId(fieldId)    
            const { ref } = field 
            payload = {...ref}
        }
        
        response.payload = payload
        return response
    }
)