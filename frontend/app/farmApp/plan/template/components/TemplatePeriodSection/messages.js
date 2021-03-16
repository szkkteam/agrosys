import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.plan.template.TemplatePeriodSection'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Adjust when do you want to start',        
    },
    automatic: {
        id: `${scope}.option.automatic`,  
        defaultMessage: 'Automatic',        
    },
    fixed: {
        id: `${scope}.option.fixed`,  
        defaultMessage: 'Fixed',        
    },
    keyEvent: {
        id: `${scope}.option.keyEvent`,  
        defaultMessage: 'Key event',        
    }
  })
