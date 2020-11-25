import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.worker.WorkerLayout'

export default defineMessages({
    tabWorkerTitle: {
        id: `${scope}.Workers.title`,  
        defaultMessage: 'Workers',
    },
    addWorkerTitle: {
        id: `${scope}.Workers.AddButton.title`,  
        defaultMessage: 'Add worker',
    },
    tabRolesTitle: {
        id: `${scope}.Roles.title`,  
        defaultMessage: 'Roles',
    },
    addRoleTitle: {
        id: `${scope}.Roles.AddButton.title`,  
        defaultMessage: 'Add role',
    },
    filterButton: {
        id: `${scope}.FilterButton.title`,  
        defaultMessage: 'Filter',
    },
    searchButton: {
        id: `${scope}.SearchButton.title`,  
        defaultMessage: 'Search...',
    }
  })