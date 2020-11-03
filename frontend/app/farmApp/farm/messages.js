import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.farm'

export default defineMessages({
    // FarmCreate
    farmCreateTitle: {
        id: `${scope}.FarmCreate.title`,  
        defaultMessage: 'New farm',
    },
    farmCreateHeaderTitle: {
        id: `${scope}.FarmCreate.headerTitle`,  
        defaultMessage: 'Create a new farm',
    },
    // FarmCreate - Form
    farmCreateFormStep1: {
        id: `${scope}.FarmCreate.Form.Step1`,  
        defaultMessage: 'Farm data',
    },
    farmCreateFormStep2: {
        id: `${scope}.FarmCreate.Form.Step2`,  
        defaultMessage: 'Entities',
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