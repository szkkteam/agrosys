import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.resource.field.notifications'

export default defineMessages({
    fieldsCreated: {
        id: `${scope}.Fields.created`,  
        defaultMessage: "{fieldCount, plural, one {# field} other {# fields}} created.",        
    },    
  })
