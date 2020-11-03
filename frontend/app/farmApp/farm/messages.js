import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.farm'

export default defineMessages({
    // FarmCreate
    farmCreateTitle: {
        id: `${scope}.FarmCreate.title`,  
        defaultMessage: 'Create a new farm',
    },
    // FarmDashboard
    farmDashboardTitle: {
        id: `${scope}.FarmDashboard.title`,  
        defaultMessage: 'Dashboard',
    },

    multifarmView: {
      id: `${scope}.FarmSelector.MultifarmView`,
      defaultMessage: 'Multifarm View',
    },
    createNewFarm: {
        id: `${scope}.FarmSelector.CreateNew`,
        defaultMessage: 'Create New',
      },
  })