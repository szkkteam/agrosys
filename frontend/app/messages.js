import { defineMessages } from 'react-intl'

export const scope = 'app.global'

export default defineMessages({
    edit: {
        id: `${scope}.edit`,  
        defaultMessage: 'Edit',
    },
    delete: {
        id: `${scope}.delete`,  
        defaultMessage: 'Delete',
    },
    welcome: {
        id: `${scope}.welcome`,  
        defaultMessage: 'Welcome back,  <b>{firstName}</b>',
    },
    archive: {
        id: `${scope}.archive`,  
        defaultMessage: 'Archive',
    },
    open: {
        id: `${scope}.open`,  
        defaultMessage: 'Open',
    },
    emptyList: {
        id: `${scope}.emptyList`,  
        defaultMessage: 'No options',
    }
  })