import { defineMessages } from 'react-intl'

export const scope = 'app.components.Table.TableSettingsColumn'

export default defineMessages({
    toggleColumns: {
        id: `${scope}.ToggleColumns.title`,  
        defaultMessage: 'Toggle columns',
    },
    selectAll: {
        id: `${scope}.ToggleColumns.selectAll`,  
        defaultMessage: 'Select all',
    }

  })