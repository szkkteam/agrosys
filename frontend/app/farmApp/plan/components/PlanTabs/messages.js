import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.plan.PlanTabs'

export default defineMessages({
    cropPlan: {
        id: `${scope}.cropPlan.title`,  
        defaultMessage: 'Crop Plan',
    },    
    fieldPlan: {
        id: `${scope}.fieldPlan.title`,  
        defaultMessage: 'Field Plan',
    },        
})