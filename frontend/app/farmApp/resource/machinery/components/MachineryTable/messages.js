import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.machinery.MachineryTable'

export default defineMessages({
    tableTitle: {
        id: `${scope}.Table.title`,  
        defaultMessage: 'Machineries - database',        
    },
    addNewTitle: {
        id: `${scope}.AddButton.title`,  
        defaultMessage: 'Add new machinery',
    },
    edit: {
        id: `${scope}.Menu.edit`,  
        defaultMessage: 'Edit',
    },
    delete: {
        id: `${scope}.Menu.delete`,  
        defaultMessage: 'Delete',
    },
  })
