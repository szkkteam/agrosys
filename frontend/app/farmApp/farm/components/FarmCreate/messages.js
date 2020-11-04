import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.farm.FarmCreate'
export const step1Fields = `${scope}.Step1.fields`
export const step2Fields = `${scope}.Step2.fields`

export default defineMessages({
    step1Title: {
        id: `${scope}.Step1.title`,  
        defaultMessage: 'Farm data',
    },
    step2Title: {
        id: `${scope}.Step2.title`,  
        defaultMessage: 'Entities',
    },
  })