import { defineMessages } from 'react-intl'

export const scope = 'app.components.Button'

export default defineMessages({
    cancel: {
        id: `${scope}.SubmitButton.Cancel`,  
        defaultMessage: 'Cancel',
    },
    back: {
        id: `${scope}.SubmitButton.Back`,  
        defaultMessage: 'Back',
    },
    next: {
        id: `${scope}.SubmitButton.Next`,  
        defaultMessage: 'Next',
    },
    submit: {
        id: `${scope}.SubmitButton.Submit`,  
        defaultMessage: 'Save',
    },
    searchButton: {
        id: `${scope}.SearchButton.title`,  
        defaultMessage: 'Search...',
    }
})