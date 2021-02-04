import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.cropProduction.widget.CultivatedArea'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Cultivated area',
    },   
    subheader: {
        id: `${scope}.subheader`,  
        defaultMessage: 'Utilization of total area',
    }, 
  })