import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.worker.WorkerTabRoles'

export default defineMessages({
    addTitle: {
        id: `${scope}.RolesAdd.title`,  
        defaultMessage: 'Add roles',
    },
    filterButton: {
        id: `${scope}.RolesFilterButton.title`,  
        defaultMessage: 'Filter',
    }
  })