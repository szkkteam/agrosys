import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.cropProduction.crop.CropDetailDialog.CropTabGeneral'

export default defineMessages({
    description1: {
        id: `${scope}.description1`,  
        defaultMessage: "Specify which crops do you grow on your fields.",        
    },
    description2: {
        id: `${scope}.description2`,  
        defaultMessage: "If you don't find your crops in the list, you can click <a>here</a> and send a request to us.",        
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
