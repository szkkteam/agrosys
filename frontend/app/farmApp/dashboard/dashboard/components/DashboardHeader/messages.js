import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.dashboard.DashboardHeader'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Dashboard - Summary',
    },    
    addNewTitle: {
        id: `${scope}.addNewWidget`,  
        defaultMessage: 'Add widget',
    },
  })