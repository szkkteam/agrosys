import { defineMessages } from 'react-intl'

export const scope = 'DELETE'

export default defineMessages({
    tableTitle: {
        id: `${scope}.Table.title`,  
        defaultMessage: 'Tasks - list',        
    },
    addNewTitle: {
        id: `${scope}.TaskAddButton.title`,  
        defaultMessage: 'Add new',
    },

  })