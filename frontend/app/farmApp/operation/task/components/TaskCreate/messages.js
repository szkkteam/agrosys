import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.operation.TaskCreate'

export default defineMessages({
    stepCrop: {
        id: `${scope}.step1.title`,  
        defaultMessage: 'Crop & Fields',        
    },
    stepParams: {
        id: `${scope}.step2.title`,  
        defaultMessage: 'Parameters',        
    },    
  })
