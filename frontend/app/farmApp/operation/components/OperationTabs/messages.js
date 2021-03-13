import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.operation.OperationTabs'

export default defineMessages({
    task: {
        id: `${scope}.tasks.title`,  
        defaultMessage: 'Planning',
    },    
    order: {
        id: `${scope}.order.title`,  
        defaultMessage: 'My tasks',
    },        
})