import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.cropProduction.widget.CropCashFlow'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Cash flow',
    },   
    subheader: {
        id: `${scope}.subheader`,  
        defaultMessage: 'Income after harvest',
    }, 
  })