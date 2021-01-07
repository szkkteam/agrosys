import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.production.crop.CropDetailDialog'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Which crops do you grow?',        
    },
    tabGeneral: {
        id: `${scope}.Tab.General`,  
        defaultMessage: 'General',        
    },
  })
