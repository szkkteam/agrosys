import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.cropProduction.season.SeasonSelectorDialog'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Select template for your season',        
    },
    addNewPlan: {
        id: `${scope}.ButtonAddNew.title`,  
        defaultMessage: "Create new template",        
    },
    description1: {
        id: `${scope}.description1`,  
        defaultMessage: "Select an already existing template from a previous season and you can and you can fine tune it according to your needs",        
    },
    description2: {
        id: `${scope}.description2`,  
        defaultMessage: "... or create a new one from scratch",        
    },
    cropTitle: {
        id: `${scope}.field.title`,  
        defaultMessage: "Crop production name",
    },
    cropType: {
        id: `${scope}.field.cropType`,  
        defaultMessage: "Crop",
    }
  })
