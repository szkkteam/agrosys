import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.operation.task.TaskCreate'

export default defineMessages({
    startDate: {
        id: `${scope}.field.startDate`,  
        defaultMessage: 'Start date',        
    },
    endDate: {
        id: `${scope}.field.endDate`,  
        defaultMessage: 'End date',        
    },   
    title: {
        id: `${scope}.field.title`,  
        defaultMessage: 'Title',        
    },   
    description: {
        id: `${scope}.field.description`,  
        defaultMessage: 'Description',        
    },   
    taskSetup: {
        id: `${scope}.taskSetup.title`,  
        defaultMessage: 'Task setup',        
    },   
    cropPlan: {
        id: `${scope}.field.cropPlan`,  
        defaultMessage: 'Crop plan',        
    },
    taskType: {
        id: `${scope}.field.taskType`,  
        defaultMessage: 'Task type',        
    },
    taskSubType: {
        id: `${scope}.field.taskSubType`,  
        defaultMessage: 'Task subtype',        
    },
    resource: {
        id: `${scope}.resource.title`,  
        defaultMessage: 'Resource reservation',        
    },
    planning: {
        id: `${scope}.planning.title`,  
        defaultMessage: 'Planning',        
    },
  })
