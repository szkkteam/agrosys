import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.resource.field.FieldSideSelector'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Select your fields',
    },
    area: {
        id: `${scope}.area`,  
        defaultMessage: "total area: <b>0</b>",
    },
  })