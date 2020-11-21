import { defineMessages } from 'react-intl'

export const scope = 'app.components.Nav'

export default defineMessages({
    resourcesTitle: {
        id: `${scope}.Resources.title`,  
        defaultMessage: 'Resources',
    },
    financesTitle: {
        id: `${scope}.Finances.title`,  
        defaultMessage: 'Finances',
    },
    plannerTitle: {
        id: `${scope}.Planner.title`,  
        defaultMessage: 'Planner',
    }
})