import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.field.FieldDrawModal'

export default defineMessages({
    blockListTitle: {
        id: `${scope}.BlockList.title`,  
        defaultMessage: 'Select a field',
    },
    fieldListTitle: {
        id: `${scope}.FieldList.title`,  
        defaultMessage: 'Select a parcel template',
    },
  })