import { defineMessages } from 'react-intl'

export const scope = 'app.security.Login'

export default defineMessages({
    submitTitle: {
        id: `${scope}.Submit.title`,  
        defaultMessage: 'Login',
    },
    submittingTitle: {
        id: `${scope}.Submit.progress`,  
        defaultMessage: 'Logging in...',
    },
    fieldUsername: {
        id: `${scope}.Field.username`,  
        defaultMessage: 'Email or Username',
    },
    fieldPassword: {
        id: `${scope}.Field.password`,  
        defaultMessage: 'Password',
    },
    forgotPassword: {
        id: `${scope}.forgotPassword`,  
        defaultMessage: 'Forgot password?',
    }
  })