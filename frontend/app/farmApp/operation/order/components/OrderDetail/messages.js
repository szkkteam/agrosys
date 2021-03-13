import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.operation.order.OrderDetail'

export default defineMessages({
    actual: {
        id: `${scope}.tab.actual`,  
        defaultMessage: 'Actuals',
    },        
    note: {
        id: `${scope}.tab.note`,  
        defaultMessage: 'Notes',
    },    
    photo: {
        id: `${scope}.tab.photo`,  
        defaultMessage: 'Photos',
    },    
    map: {
        id: `${scope}.tab.map`,  
        defaultMessage: 'Map',
    },    
    activity: {
        id: `${scope}.tab.activity`,  
        defaultMessage: 'Activity',
    },    
})