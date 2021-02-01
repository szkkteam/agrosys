import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.cropProduction.widget.CropExpense'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Expenses',
    },   
    subheader: {
        id: `${scope}.subheader`,  
        defaultMessage: 'Expenses of crops',
    }, 
  })