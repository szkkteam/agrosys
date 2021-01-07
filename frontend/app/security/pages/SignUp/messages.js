import { defineMessages } from 'react-intl'

export const scope = 'app.security.SignUp'

export default defineMessages({
    submitTitle: {
        id: `${scope}.Submit.title`,  
        defaultMessage: 'Sign up',
    },
    submittingTitle: {
        id: `${scope}.Submit.progress`,  
        defaultMessage: 'Siging up...',
    },
    fieldUsername: {
        id: `${scope}.Field.username`,  
        defaultMessage: 'Username',
    },
    fieldPassword: {
        id: `${scope}.Field.password`,  
        defaultMessage: 'Password',
    },
    fieldFirstName: {
        id: `${scope}.Field.firstName`,  
        defaultMessage: 'First name',
    },
    fieldLastName: {
        id: `${scope}.Field.lastName`,  
        defaultMessage: 'Last name',
    },
    fieldEmail: {
        id: `${scope}.Field.email`,  
        defaultMessage: 'Email',
    }
  })