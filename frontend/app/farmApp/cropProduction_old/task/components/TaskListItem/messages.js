import { defineMessages } from 'react-intl'

export const scope = 'DELETE'

export default defineMessages({
    dueDate: {
        id: `${scope}.dueDate`,  
        defaultMessage: 'Show and manage tasks for your current crop production.',
    },   
    addNewTitle: {
        id: `${scope}.AddButton.title`,  
        defaultMessage: 'Add crop',
    }, 
  })