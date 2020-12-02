import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.resource.ResourcesHeader'

export default defineMessages({
    tabWorkerTitle: {
        id: `${scope}.Worker.title`,  
        defaultMessage: 'Workers',
    },
    tabFieldsTitle: {
        id: `${scope}.Block.title`,  
        defaultMessage: 'Fields',
    },
    tabMachineryTitle: {
        id: `${scope}.Machinery.title`,  
        defaultMessage: 'Machineries',
    },
    tabEntitiyTitle: {
        id: `${scope}.Entitiy.title`,  
        defaultMessage: 'Entities',
    },
    tabStorageTitle: {
        id: `${scope}.Storage.title`,  
        defaultMessage: 'Storages',
    },
  })