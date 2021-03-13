import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.operation.TaskDetail'

export default defineMessages({
    overview: {
        id: `${scope}.tab.overview`,  
        defaultMessage: 'Overview',
    },    
    plan: {
        id: `${scope}.tab.plan`,  
        defaultMessage: 'Planning',
    },    
    schedule: {
        id: `${scope}.tab.scheduling`,  
        defaultMessage: 'Scheduling',
    },    
    activity: {
        id: `${scope}.tab.activity`,  
        defaultMessage: 'activity',
    },    
    field: {
        id: `${scope}.tab.field`,  
        defaultMessage: 'Fields',
    },    
})