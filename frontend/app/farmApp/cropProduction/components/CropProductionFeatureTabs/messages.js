import { defineMessages } from 'react-intl'

export const scope = 'DELETE'

export default defineMessages({
    task: {
        id: `${scope}.task.title`,  
        defaultMessage: 'Tasks',
    },    
    field: {
        id: `${scope}.field.title`,  
        defaultMessage: 'Fields',
    },        
})