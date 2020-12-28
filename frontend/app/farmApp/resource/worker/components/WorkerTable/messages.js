import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.worker.WorkerTable'

export default defineMessages({
    tableTitle: {
        id: `${scope}.Table.title`,  
        defaultMessage: 'Workers - database',        
    },
    addNewTitle: {
        id: `${scope}.WorkerAddButton.title`,  
        defaultMessage: 'Add new',
    },

  })