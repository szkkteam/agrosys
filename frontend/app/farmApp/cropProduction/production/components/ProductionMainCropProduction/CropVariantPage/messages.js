import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.cropProduction.production.PlanSummaryTable'

export default defineMessages({
    title: {
        id: `${scope}.Table.title`,  
        defaultMessage: 'Define your fields and what you grow there.',
    },
    addParcel: {
        id: `${scope}.AddParcel.title`,  
        defaultMessage: 'Add parcels',
    }
    
  })