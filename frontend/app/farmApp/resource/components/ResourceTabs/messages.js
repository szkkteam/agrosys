import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.resource.ResourceTabs'

export default defineMessages({
    machinery: {
        id: `${scope}.machinery.title`,  
        defaultMessage: 'Machinery',
    },    
    worker: {
        id: `${scope}.worker.title`,  
        defaultMessage: 'Worker',
    },    
    entity: {
        id: `${scope}.entity.title`,  
        defaultMessage: 'Entity',
    },    
    field: {
        id: `${scope}.field.title`,  
        defaultMessage: 'Field',
    },    
})