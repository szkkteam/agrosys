import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.operation'


export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Operations',
    },
    task: {
        id: `${scope}.task`,  
        defaultMessage: 'Planning',
    },
    operationCreate: {
        id: `${scope}.taskCreate.title`,  
        defaultMessage: 'Create new task',
    },
    appBarTitle: {
        id: `${scope}.appBar.title`,  
        defaultMessage: 'Operations',
    }, 
    
    operationDetail: {
        id: `${scope}.taskDetail.title`,  
        defaultMessage: '{task} - {crop}',
    }
  })