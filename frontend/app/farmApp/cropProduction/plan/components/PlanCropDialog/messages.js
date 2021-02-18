import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.cropProduction.plan.PlanCropDialog'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Plan your crop production',        
    },
    tabGeneral: {
        id: `${scope}.Tab.General`,  
        defaultMessage: 'General',        
    },
    stepCrop: {
        id: `${scope}.step1.title`,  
        defaultMessage: 'Crops',        
    },
    stepTask: {
        id: `${scope}.step2.title`,  
        defaultMessage: 'Tasks',        
    },
    stepField: {
        id: `${scope}.step3.title`,  
        defaultMessage: 'Fields',        
    },
    stepSubsidy: {
        id: `${scope}.step4.title`,  
        defaultMessage: 'Subsidies',        
    },
    stepFinance: {
        id: `${scope}.step5.title`,  
        defaultMessage: 'Finance',        
    },
  })
