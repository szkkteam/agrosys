import { defineMessages } from 'react-intl'

export const scope = 'DELETE'
const validationScope = `${scope}.Validation`

export default defineMessages({
    borderEditTitle: {
        id: `${scope}.title`,  
        defaultMessage: 'Border editing',
    },
    borderEditDesc: {
        id: `${scope}.description`,  
        defaultMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in tortor blandit diam dapibus gravida. Nulla eu ligula massa. Sed sed porta enim, in feugiat diam.',
    },
    borderEditButtonTitle: {
        id: `${scope}.button.title`,  
        defaultMessage: 'edit borders',
    },
    generalTabTitle: {
        id: `${scope}.GeneralTab.title`,  
        defaultMessage: 'general',
    },
    lpisTabTitle: {
        id: `${scope}.LpisTab.title`,  
        defaultMessage: 'subsidies',
    },
    fieldBlockTitle: {
        id: `${scope}.form.blockTitle`,  
        defaultMessage: 'Block Title',
    },
    cropTabTitle: {
        id: `${scope}.CropTab.title`,  
        defaultMessage: 'crop',
    },  
    titleMissing: {
        id: `${validationScope}.title.Missing`,  
        defaultMessage: 'Title is required',        
    },
    areaMissing: {
        id: `${validationScope}.area.Missing`,  
        defaultMessage: 'Area is required',        
    },
    ownershipMissing: {
        id: `${validationScope}.ownership.Missing`,  
        defaultMessage: 'Ownership is required',        
    },  
    meparIdMissing: {
        id: `${validationScope}.meparId.Missing`,  
        defaultMessage: 'MePAR number is required',        
    },  
  })