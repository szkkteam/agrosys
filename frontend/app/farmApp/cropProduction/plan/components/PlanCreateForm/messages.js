import { defineMessages } from 'react-intl'

export const scope = 'DELETE'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Current crops',
    },   
    addCropTitle: {
        id: `${scope}.addCrop.title`,  
        defaultMessage: 'Add crop',
    }, 
  })