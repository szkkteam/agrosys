import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.production.crop.CropHeaderTabs'

export default defineMessages({
    overview: {
        id: `${scope}.overview`,  
        defaultMessage: 'Summary',
    },
    timeline: {
        id: `${scope}.timeline`,  
        defaultMessage: 'Timeline',
    },
  })