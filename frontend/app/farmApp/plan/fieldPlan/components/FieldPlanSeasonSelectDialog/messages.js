import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.plan.fieldPlan.FieldPlanSeasonSelectDialog'
const validationScope = `${scope}.Validation`

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Select a season for your field plan',        
    },
    subheader: {
        id: `${scope}.subheader`,  
        defaultMessage: "If you cannot find your season this means you dont have crop plan created yet. Click <a>here</a> to create a crop plan.",        
    }
    
  })
