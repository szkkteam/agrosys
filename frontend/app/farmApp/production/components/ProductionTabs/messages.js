import { defineMessages } from 'react-intl'

const scope = 'app.farmApp.production.ProductionTabs'
const summaryScope = `${scope}.ProductionTabSummary`
const taskScope = `${scope}.ProductionTabTask`

export default defineMessages({
    summaryTitle: {
        id: `${summaryScope}.title`,
        defaultMessage: 'Summary',
    },
    taskTitle: {
        id: `${taskScope}.title`,
        defaultMessage: 'Summary',
    }
  })