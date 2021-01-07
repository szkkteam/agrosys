import { defineMessages } from 'react-intl'

export const scope = 'app.security.ForgotPassword'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Forgot Password',
    },
    submitTitle: {
        id: `${scope}.Submit.title`,  
        defaultMessage: 'Submit',
    },
    submittingTitle: {
        id: `${scope}.Submit.progress`,  
        defaultMessage: 'Submitting...',
    },
    fieldEmail: {
        id: `${scope}.Field.email`,  
        defaultMessage: 'Email address',
    },
    
  })