import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.dashboard.widget.UpcomingTask'

export default defineMessages({
    tooltip: {
        id: `${scope}.tooltip`,  
        defaultMessage: 'Show and manage tasks for your current crop production.',
    },   
    addNewTitle: {
        id: `${scope}.AddButton.title`,  
        defaultMessage: 'Add crop',
    }, 
  })