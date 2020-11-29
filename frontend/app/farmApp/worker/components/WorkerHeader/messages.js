import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.worker.WorkerHeader'

export default defineMessages({
    tabWorkerTitle: {
        id: `${scope}.Workers.title`,  
        defaultMessage: 'Workers',
    },
    tabRolesTitle: {
        id: `${scope}.Roles.title`,  
        defaultMessage: 'Roles',
    },
  })