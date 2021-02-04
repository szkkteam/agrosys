import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.cropProduction.widget.CropIncome'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Income',
    },   
    subheader: {
        id: `${scope}.subheader`,  
        defaultMessage: 'Income after harvest',
    }, 
  })