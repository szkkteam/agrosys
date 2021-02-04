import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.cropProduction.fieldProduction.FieldWeather'

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