import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.plan.fieldPlan.FieldPlanCreate'

export default defineMessages({
    stepCrop: {
        id: `${scope}.crop.stepTitle`,  
        defaultMessage: 'Crop plan',        
    },
    stepLpis: {
        id: `${scope}.lpis.stepTitle`,  
        defaultMessage: 'Subsidies',        
    },    
    stepCropTitle: {
        id: `${scope}.crop.title`,  
        defaultMessage: 'Provide information about the crop you want to grow',    
    },
    stepCropSubheader: {
        id: `${scope}.crop.subheader`,  
        defaultMessage: 'Every detail will be considered in the application so please be accurate.',    
    },
    addField: {
        id: `${scope}.addField`,  
        defaultMessage: 'Add field',        
    },
    cropFieldTitle: {
        id: `${scope}.field.title`,  
        defaultMessage: 'Field',        
    },
    cropFieldCrop: {
        id: `${scope}.crop.field.crop`,  
        defaultMessage: 'Crop',        
    },
    cropFieldVariant: {
        id: `${scope}.crop.field.variant`,  
        defaultMessage: 'Variant',        
    },
    cropFieldYield: {
        id: `${scope}.crop.field.yield`,  
        defaultMessage: 'Yield',        
    },
    lpisFieldTable: {
        id: `${scope}.lpis.field.table`,  
        defaultMessage: 'Table number',        
    },
    lpisFieldCropCode: {
        id: `${scope}.lpis.field.cropCode`,  
        defaultMessage: 'Crop code',        
    },
    lpisFieldAkg: {
        id: `${scope}.lpis.field.akg`,  
        defaultMessage: 'AKG',        
    },
    lpisFieldSubsidies: {
        id: `${scope}.lpis.field.subsidies`,  
        defaultMessage: 'Subsidies',        
    },
    lpisFieldKetKat: {
        id: `${scope}.lpis.field.ketKat`,  
        defaultMessage: 'KET/KAT',        
    },
})
