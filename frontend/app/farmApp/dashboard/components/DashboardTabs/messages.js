import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.dashboard.DashboardTabs'

export default defineMessages({
    overview: {
        id: `${scope}.overview.title`,  
        defaultMessage: 'Overview',
    },    
    crop: {
        id: `${scope}.crop.title`,  
        defaultMessage: 'Crops',
    },    
    finance: {
        id: `${scope}.finance.title`,  
        defaultMessage: 'Finance',
    },    
    resource: {
        id: `${scope}.resource.title`,  
        defaultMessage: 'Resources',
    },    
})