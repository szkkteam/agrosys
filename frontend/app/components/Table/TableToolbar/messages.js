import { defineMessages } from 'react-intl'

export const scope = 'app.components.Table.TableToolbar'

export default defineMessages({
    add: {
        id: `${scope}.Add.title`,  
        defaultMessage: 'Add new',
    },
    showColumnsTitle: {
        id: `${scope}.showColumns.title`,  
        defaultMessage: 'Add or remove columns',
    },
    showColumnsTooltip: {
        id: `${scope}.showColumns.tooltip`,  
        defaultMessage: 'Show columns',
    },
    filters: {
        id: `${scope}.Filter.title`,  
        defaultMessage: 'filters',
    },    
    chip1: {
        id: `${scope}.Chip1.title`,  
        defaultMessage: 'Pony Car',
    },
    chip2: {
        id: `${scope}.Chip2.title`,  
        defaultMessage: 'Mustang',
    },
    chip3: {
        id: `${scope}.Chip3.title`,  
        defaultMessage: '1987',
    },
  })