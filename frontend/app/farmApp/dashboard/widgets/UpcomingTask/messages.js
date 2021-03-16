import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.dashboard.widgets.UpcomingTask'

export default defineMessages({
    tooltip: {
        id: `${scope}.tooltip`,  
        defaultMessage: 'Show and manage tasks for your current crop production.',
    },   
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Upcoming tasks',
    }, 
    subheader: {
        id: `${scope}.subheader`,  
        defaultMessage: 'Upcoming tasks assigned to me',
    }, 
  })