import { defineMessages } from 'react-intl'

export const scope = 'app.components.Table.TableFilters'

export default defineMessages({
    activeFilters: {
        id: `${scope}.activeFilters.title`,  
        defaultMessage: 'Active filters:',
    },
    noActiveFilters: {
        id: `${scope}.noActiveFilters.title`,  
        defaultMessage: 'No filters are active',
    },
    clearAll: {
        id: `${scope}.clearAll.title`,  
        defaultMessage: 'clear all',
    },
  })