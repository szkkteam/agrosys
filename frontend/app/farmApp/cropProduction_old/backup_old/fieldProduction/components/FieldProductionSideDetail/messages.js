import { defineMessages } from 'react-intl'

export const scope = 'DELETE'

export default defineMessages({
    edit: {
        id: `${scope}.Menu.edit`,  
        defaultMessage: 'Edit',
    },
    delete: {
        id: `${scope}.Menu.delete`,  
        defaultMessage: 'Delete',
    },
  })