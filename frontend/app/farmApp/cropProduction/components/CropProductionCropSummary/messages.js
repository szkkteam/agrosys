import { defineMessages } from 'react-intl'

export const scope = 'DELETE'

export default defineMessages({
    income: {
        id: `${scope}.Income`,  
        defaultMessage: 'Predicted income',
    },   
    area: {
        id: `${scope}.Area`,  
        defaultMessage: 'Total area',
    }, 
    yield: {
        id: `${scope}.Yield`,  
        defaultMessage: 'Predicted yield',
    }, 
    expenses: {
        id: `${scope}.Expenses`,  
        defaultMessage: 'Predicted expenses',
    }, 
  })