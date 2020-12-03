import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.resource.ResourcesHeader'

export default defineMessages({
    pageTitle: {
        id: `${scope}.title`,  
        defaultMessage: 'Resources',
    },
    tabWorkerTitle: {
        id: `${scope}.Worker.title`,  
        defaultMessage: 'Worker',
    },
    tabFieldsTitle: {
        id: `${scope}.Block.title`,  
        defaultMessage: 'Field',
    },
    tabMachineryTitle: {
        id: `${scope}.Machinery.title`,  
        defaultMessage: 'Machinery',
    },
    tabEntitiyTitle: {
        id: `${scope}.Entitiy.title`,  
        defaultMessage: 'Entity',
    },
    tabStorageTitle: {
        id: `${scope}.Storage.title`,  
        defaultMessage: 'Storage',
    },
  })