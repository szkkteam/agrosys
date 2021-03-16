import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.plan.cropPlan.CropPlanCreate'

export default defineMessages({
    stepCrop: {
        id: `${scope}.crop.stepTitle`,  
        defaultMessage: 'Crops',        
    },
    stepTask: {
        id: `${scope}.task.stepTitle`,  
        defaultMessage: 'Tasks',        
    },    
    stepCropTitle: {
        id: `${scope}.crop.title`,  
        defaultMessage: 'Provide information about the crop you want to grow',    
    },
    stepCropSubheader: {
        id: `${scope}.crop.subheader`,  
        defaultMessage: 'Every detail will be considered in the application so please be accurate.',    
    },
    cropfieldTitle: {
        id: `${scope}.crop.field.title`,  
        defaultMessage: 'title',    
    },
    cropfieldCropType: {
        id: `${scope}.crop.field.cropType`,  
        defaultMessage: 'Crop type',    
    },
    cropfieldYield: {
        id: `${scope}.crop.field.yield`,  
        defaultMessage: 'Yield',    
    },
    stepTemplateTitle: {
        id: `${scope}.template.title`,  
        defaultMessage: 'Provide information about the crop you want to grow',   
    },
    stepTemplateSubheader: {
        id: `${scope}.template.subheader`,  
        defaultMessage: 'Every detail will be considered in the application so please be accurate.', 
    },
    templateFieldTemplate: {
        id: `${scope}.template.field.template`,  
        defaultMessage: 'Task template',    
    },    
  })
