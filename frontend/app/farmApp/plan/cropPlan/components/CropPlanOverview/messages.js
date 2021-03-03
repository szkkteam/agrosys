import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.plan.cropPlan.CropPlanOverview'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Crop plans',
    },   
    subheader: {
        id: `${scope}.subheader`,  
        defaultMessage: 'Plan your crops',
    },   
    addCropPlan: {
        id: `${scope}.addCropPlan.title`,  
        defaultMessage: 'New crop plan',
    }, 
    addTaskPlan: {
        id: `${scope}.addTaskPlan.title`,  
        defaultMessage: 'New task',
    }, 
  })