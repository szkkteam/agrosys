import { defineMessages } from 'react-intl'

export const scope = 'DELETE'

export default defineMessages({
    calendarTitle: {
        id: `${scope}.Calendar.title`,  
        defaultMessage: 'Tasks - Calendar',
    },
    listTitle: {
        id: `${scope}.List.title`,  
        defaultMessage: 'Tasks - List',
    },
    addNewTitle: {
        id: `${scope}.AddButton.title`,  
        defaultMessage: 'Add new',
    },
  })