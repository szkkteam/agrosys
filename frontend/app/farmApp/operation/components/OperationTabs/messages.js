import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.operation.OperationTabs'

export default defineMessages({
    task: {
        id: `${scope}.tasks.title`,  
        defaultMessage: 'Tasks',
    },    
    table: {
        id: `${scope}.table.title`,  
        defaultMessage: 'Table',
    },        
})