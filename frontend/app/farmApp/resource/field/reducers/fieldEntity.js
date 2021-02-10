import schema from 'farmApp/schema'
import { listField, createField } from '../actions'

export default function(action, Field, session) {
    const { type, payload } = action

    switch(type) {
    
        case listField.SUCCESS:
            const { fields } = payload || []
            fields.forEach(field => Field.parse(field))
            break
        case createField.SUCCESS:
            const { field } = payload || null
            Field.parse(field)
        default:
            break    
    }
    return session.state
}