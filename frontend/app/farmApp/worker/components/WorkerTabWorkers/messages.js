import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.worker.WorkerTabWorkers'

export default defineMessages({
    addTitle: {
        id: `${scope}.WorkersAdd.title`,  
        defaultMessage: 'Add workers',
    },
    expandRowTooltip: {
        id: `${scope}.WorkersTable.expandRowTooltip`,  
        defaultMessage: 'Show details',
    },
    filterButton: {
        id: `${scope}.WorkersFilterButton.title`,  
        defaultMessage: 'Filter',
    }
  })