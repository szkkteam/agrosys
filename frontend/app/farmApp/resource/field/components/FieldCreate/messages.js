import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.resource.field.FieldCreate'

export default defineMessages({
    addField: {
        id: `${scope}.addField`,  
        defaultMessage: 'Add field',
    },
    boundary: {
        id: `${scope}.header.boundary`,  
        defaultMessage: 'Boundary',
    },
    area: {
        id: `${scope}.header.area`,  
        defaultMessage: 'Area',
    },
    title: {
        id: `${scope}.header.title`,  
        defaultMessage: 'Title',
    },
    ownership: {
        id: `${scope}.header.ownership`,  
        defaultMessage: 'Ownership',
    },
    cadastralPlot: {
        id: `${scope}.header.cadastralPlot`,  
        defaultMessage: 'Cadastral Plot',
    },
    lpis: {
        id: `${scope}.header.lpis`,  
        defaultMessage: 'MePAR block',
    },
    lpisLabel: {
        id: `${scope}.field.label.lpis`,  
        defaultMessage: 'MePAR block identifier',
    }
  })