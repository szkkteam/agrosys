import { defineMessages } from 'react-intl'

export const scope = 'app.security.AuthHeader'

export default defineMessages({
    tabLogin: {
        id: `${scope}.Login`,  
        defaultMessage: 'Login',
    },
    tabSignup: {
        id: `${scope}.Signup`,  
        defaultMessage: 'Signup',
    },
  })