import { defineMessages } from 'react-intl'

export const scope = 'app.global'
export const constantsScope = 'app.global.constants'
export const validatonScope = 'app.global.validation'

export default defineMessages({
    /**
     * Globals
     */
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
    select: {
        id: `${scope}.select`,  
        defaultMessage: 'Select',
    },    
    loading: {
        id: `${scope}.loading`,  
        defaultMessage: 'Loading ...',
    },    
    complete: {
        id: `${scope}.complete`,  
        defaultMessage: 'Complete',
    },
    pending: {
        id: `${scope}.pending`,  
        defaultMessage: 'Pending',
    },
    /**
     * Constants
     */
    planting: {
        id: `${constantsScope}.planting`,  
        defaultMessage: 'Planting',
    },
    harvest: {
        id: `${constantsScope}.harvest`,  
        defaultMessage: 'Harvest',
    },
    tilage: {
        id: `${constantsScope}.tilage`,  
        defaultMessage: 'Tilage',
    },
    productApplication: {
        id: `${constantsScope}.productApplication`,  
        defaultMessage: 'Product Application',
    },
    scouting: {
        id: `${constantsScope}.scouting`,  
        defaultMessage: 'Scouting',
    },
    soilSampling: {
        id: `${constantsScope}.soilSampling`,  
        defaultMessage: 'Soil Sampling',
    },
    irrigation: {
        id: `${constantsScope}.irrigation`,  
        defaultMessage: 'Irrigation',
    },
    other: {
        id: `${constantsScope}.other`,  
        defaultMessage: 'Other',
    },
    mainCropProduction: {
        id: `${constantsScope}.cropProductionType.mainCropProduction`,
        defaultMessage: 'Main crop production',
    },
    secondaryCropProduction: {
        id: `${constantsScope}.cropProductionType.secondaryCropProduction`,
        defaultMessage: 'Secondary crop production',
    },
    /**
     * Validation
     */
    validationRequired: {
        id: `${validatonScope}.required`,  
        defaultMessage: 'Field required',
    },
  })