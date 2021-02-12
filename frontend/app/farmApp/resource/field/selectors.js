import { createSelector } from 'reselect'
import { createSelector as createSelectorOrm } from 'redux-orm';
import schema from 'farmApp/schema'

import { selectFieldRequest } from './reducers/fieldRequest'


const getIfExists = (model, id, fallback=null) => {
    if (model.idExists(id)) {
        const { ref } = model.withId(id)    
        return {...ref}
    } else {
        return fallback
    }
}


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
        
        const { Field } = session
        response.payload = getIfExists(Field, fieldId)

        return response
    }
)

export const getSelectedFieldsArea = () => createSelectorOrm(
    schema,
    selectFieldRequest,
    (_, selectedIds) => selectedIds,
    (session, request, selectedIds) => {
        const { isLoading = true, error = null } = request || {}

        let area = 0
        let response = {payload: { area }, isLoading, error }
        if (isLoading || error || (!selectedIds)) return response

        const { Field } = session        
      
        if (Array.isArray(selectedIds)) {
            area = selectedIds.reduce((sum, id) => {
                const field = getIfExists(Field, id)
                return field? sum + field.area : sum                
            }, 0)
        } else {
            const field = getIfExists(Field, selectedIds)
            area = field? field.area : area
        }
                
        response.payload = { area }
        return response
    }
)