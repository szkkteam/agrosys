import { defineMessages } from 'react-intl'

export const scope = 'DELETE'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Weather',
    },
    tooltip: {
        id: `${scope}.tooltip`,  
        defaultMessage: 'Wheather forecast for all of your fields.',
    }
  })