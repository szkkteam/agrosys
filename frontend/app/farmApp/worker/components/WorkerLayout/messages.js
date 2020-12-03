import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.worker.WorkerLayout'

export default defineMessages({
    left: {
        id: `${scope}.WorkerTab.title`,  
        defaultMessage: 'Workers',
    },
    right: {
        id: `${scope}.RoleTab.title`,  
        defaultMessage: 'Roles',
    },
  })