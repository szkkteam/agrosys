import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.cropProduction.field.FieldDrawDialog'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Draw a field on the map',
    },
    blockListTitle: {
        id: `${scope}.BlockList.title`,  
        defaultMessage: 'Select a field',
    },
    fieldListTitle: {
        id: `${scope}.FieldList.title`,  
        defaultMessage: 'Select a field template',
    },
  })