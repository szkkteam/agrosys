import schema from 'farmApp/schema'
import { listField, createField } from '../actions'

export default function(action, Field, session) {
    const { type, payload } = action
    const { fields } = payload || []

    switch(type) {
    
        case listField.SUCCESS:
            fields.forEach(field => Field.parse(field))
            break
        case createField.SUCCESS:
            if (Array.isArray(fields)) {
                fields.forEach(field => Field.parse(field))
            } else {
                Field.parse(fields)
            }
        default:
            break    
    }
    return session.state
}