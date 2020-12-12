import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.production.ProductionHeader'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Productions',
    },
    productionMultiView: {
        id: `${scope}.multiView`,  
        defaultMessage: 'All',
    },
  })