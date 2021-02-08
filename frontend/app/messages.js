import { defineMessages } from 'react-intl'

export const scope = 'app.global'
const production = 'app.farmApp.cropProduction.production'

export default defineMessages({
    edit: {
        id: `${scope}.edit`,  
        defaultMessage: 'Edit',
    },
    delete: {
        id: `${scope}.delete`,  
        defaultMessage: 'Delete',
    },
    welcome: {
        id: `${scope}.welcome`,  
        defaultMessage: 'Welcome back,  <b>{firstName}</b>',
    },
    archive: {
        id: `${scope}.archive`,  
        defaultMessage: 'Archive',
    },
    open: {
        id: `${scope}.open`,  
        defaultMessage: 'Open',
    },
    close: {
        id: `${scope}.close`,  
        defaultMessage: 'Close',
    },
    emptyList: {
        id: `${scope}.emptyList`,  
        defaultMessage: 'No options',
    },
    save: {
        id: `${scope}.save`,  
        defaultMessage: 'Save',
    },
    back: {
        id: `${scope}.back`,  
        defaultMessage: 'Back',
    },
    cancel: {
        id: `${scope}.cancel`,  
        defaultMessage: 'Cancel',
    },
    submit: {
        id: `${scope}.submit`,  
        defaultMessage: 'Submit',
    },
    next: {
        id: `${scope}.next`,  
        defaultMessage: 'Next',
    },
    mainCropProduction: {
        id: `${production}.cropProductionType.mainCropProduction`,
        defaultMessage: 'Main crop production',
    },
    secondaryCropProduction: {
        id: `${production}.cropProductionType.secondaryCropProduction`,
        defaultMessage: 'Secondary crop production',
    },
    loading: {
        id: `${scope}.loading`,  
        defaultMessage: 'Loading ...',
    }
  })