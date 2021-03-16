import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.resource.field.FieldDrawFormButton'

export default defineMessages({
    fieldCount: {
        id: `${scope}.fieldCount`,  
        defaultMessage: "{fieldCount, plural, one {# field} other {# fields}}",
    },    
  })