import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.worker.WorkerRoleTab'

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