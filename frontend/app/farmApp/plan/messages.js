import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.plan'

export default defineMessages({
    cropPlanCreate: {
        id: `${scope}.cropPlanCreate.title`,  
        defaultMessage: 'Create new crop plan',
    },
    cropPlanOverview: {
        id: `${scope}.cropPlanOverview.title`,  
        defaultMessage: 'Crop plans',
    },
    fieldPlanOverview: {
        id: `${scope}.fieldPlanOverview.title`,  
        defaultMessage: 'Field plans',
    },
    appBarTitle: {
        id: `${scope}.appBar.title`,  
        defaultMessage: 'Plans',
    }, 
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Plans',
    }
  })