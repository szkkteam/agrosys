import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.report.resource.ResourceTabHeader'

export default defineMessages({
    tabSummaryTitle: {
        id: `${scope}.Summary.title`,  
        defaultMessage: 'Summary',
    },
    tabBlockTitle: {
        id: `${scope}.Block.title`,  
        defaultMessage: 'Field',
    },
    tabMachineryTitle: {
        id: `${scope}.Machinery.title`,  
        defaultMessage: 'Machinery',
    },
    tabWorkerTitle: {
        id: `${scope}.Worker.title`,  
        defaultMessage: 'Worker',
    },
    tabUsageTitle: {
        id: `${scope}.Usage.title`,  
        defaultMessage: 'Usage',
    },
    tabInventoryTitle: {
        id: `${scope}.Inventory.title`,  
        defaultMessage: 'Inventory',
    },
  })