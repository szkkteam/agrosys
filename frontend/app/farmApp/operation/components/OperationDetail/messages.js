import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.operation.OperationDetail'

export default defineMessages({
    overview: {
        id: `${scope}.tab.overview`,  
        defaultMessage: 'Overview',
    },    
    treatment: {
        id: `${scope}.tab.treatment`,  
        defaultMessage: 'Activity',
    },    
    resource: {
        id: `${scope}.tab.resource`,  
        defaultMessage: 'Resources',
    },    
    field: {
        id: `${scope}.tab.field`,  
        defaultMessage: 'Fields',
    },    
})