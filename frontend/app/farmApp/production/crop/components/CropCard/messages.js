import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.production.crop.CropCard'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Crops',
    },    
    addNewTitle: {
        id: `${scope}.AddButton.title`,  
        defaultMessage: 'Add new season',
    }, 
  })