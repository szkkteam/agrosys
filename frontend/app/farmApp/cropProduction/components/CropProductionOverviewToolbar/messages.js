import { defineMessages } from 'react-intl'

export const scope = 'DELETE'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Current crops',
    },   
    addNewTitle: {
        id: `${scope}.AddButton.title`,  
        defaultMessage: 'Add new crop',
    }, 
  })