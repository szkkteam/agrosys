import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.production.ProductionLayout'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Production',
    },
    tabSummaryTitle: {
        id: `${scope}.Summary.title`,  
        defaultMessage: 'Summary',
    },
    tabTasksTitle: {
        id: `${scope}.Tasks.title`,  
        defaultMessage: 'Tasks',
    },
    tabCropVariantTitle: {
        id: `${scope}.CropVariants.title`,  
        defaultMessage: 'Crop & Variants',
    },
    tabFieldsTitle: {
        id: `${scope}.Fields.title`,  
        defaultMessage: 'Fields',
    },
    tabPestsTitle: {
        id: `${scope}.Pests.title`,  
        defaultMessage: 'Pests',
    },
    tabAnalysisTitle: {
        id: `${scope}.Analysis.title`,  
        defaultMessage: 'Analysis',
    },
    tabWeatherTitle: {
        id: `${scope}.Weather.title`,  
        defaultMessage: 'Weather',
    },
  })