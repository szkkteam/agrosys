import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.cropProduction.task.widget.CropUpcomingTask'

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