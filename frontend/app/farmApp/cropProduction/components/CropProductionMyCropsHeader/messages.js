import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.cropProduction.CropProductionMyCropsHeader'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Crops',
    },
    productionMultiView: {
        id: `${scope}.multiView`,  
        defaultMessage: 'All',
    },
    cropDashboard: {
        id: `${scope}.dashboard`,  
        defaultMessage: 'Dashboard',
    },
  })