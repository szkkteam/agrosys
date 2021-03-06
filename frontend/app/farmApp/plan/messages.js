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
    fieldPlanCreate: {
        id: `${scope}.fieldPlanCreate.title`,  
        defaultMessage: 'Create new field plan',
    },
    appBarTitle: {
        id: `${scope}.appBar.title`,  
        defaultMessage: 'Plans',
    }, 
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Plans',
    },
    newFieldPlan: {
        id: `${scope}.newFieldPlan.title`,  
        defaultMessage: 'New field plan',
    },
  })