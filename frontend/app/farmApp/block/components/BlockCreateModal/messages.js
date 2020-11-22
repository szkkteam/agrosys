import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.block.BlockCreateModal'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Add new field',
    },
    drawTitle: {
        id: `${scope}.draw.title`,  
        defaultMessage: 'Draw field',
    },
    drawDesc: {
        id: `${scope}.draw.description`,  
        defaultMessage: 'Draw fields directly on the map',
    },
    uploadTitle: {
        id: `${scope}.upload.title`,  
        defaultMessage: 'Upload fields',
    },
    uploadDesc: {
        id: `${scope}.upload.description`,  
        defaultMessage: 'Upload fields from files',
    },
    lpisTitle: {
        id: `${scope}.lpis.title`,  
        defaultMessage: 'Select on map',
    },
    lpisDesc: {
        id: `${scope}.lpis.description`,  
        defaultMessage: 'Select field from MePAR',
    },
  })