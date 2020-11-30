import { defineMessages } from 'react-intl'

export const scope = 'app.components.Table.TableHeaders'

export default defineMessages({
    add: {
        id: `${scope}.Add.title`,  
        defaultMessage: 'Add new',
    },
    columns: {
        id: `${scope}.Column.title`,  
        defaultMessage: 'columns',
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