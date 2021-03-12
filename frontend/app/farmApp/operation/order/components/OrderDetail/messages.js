import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.operation.order.OrderDetail'

export default defineMessages({
    plan: {
        id: `${scope}.tab.plan`,  
        defaultMessage: 'Plan',
    },    
    actual: {
        id: `${scope}.tab.actual`,  
        defaultMessage: 'Actuals',
    },        
})