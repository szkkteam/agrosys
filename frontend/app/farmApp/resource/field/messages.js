import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.resource.field'


export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Fields',
    },
    fieldCreate: {
        id: `${scope}.fieldCreate.title`,  
        defaultMessage: 'Create new fields',
    },    
    fieldEdit: {
        id: `${scope}.fieldEdit.title`,  
        defaultMessage: 'Edit field',
    }
  })