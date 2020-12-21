import { defineMessages } from 'react-intl'

export const scope = 'app.production.task.TaskLayout'

export default defineMessages({
    calendarTitle: {
        id: `${scope}.Calendar.title`,  
        defaultMessage: 'Tasks - Calendar',
    },
    listTitle: {
        id: `${scope}.List.title`,  
        defaultMessage: 'Tasks - List',
    },
  })