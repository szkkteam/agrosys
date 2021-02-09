import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.cropProduction.crop.CropCreateDialog'
const validationScope = `${scope}.Validation`

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Which crops do you grow?',        
    },
    tabGeneral: {
        id: `${scope}.Tab.General`,  
        defaultMessage: 'General',        
    },
    titleMissing: {
        id: `${validationScope}.title.Missing`,  
        defaultMessage: 'Title is required',        
    },
    cropTypeMissing: {
        id: `${validationScope}.cropType.Missing`,  
        defaultMessage: 'Crop type is required',        
    },
  })
