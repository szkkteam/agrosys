import { defineMessages } from 'react-intl'

export const scope = 'DELETE'

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
        defaultMessage: 'Crops and variants',        
    },
    stepSubsidy: {
        id: `${scope}.step2.title`,  
        defaultMessage: 'Subsidies',        
    },
    stepTask: {
        id: `${scope}.step3.title`,  
        defaultMessage: 'Tasks',        
    }
  })
