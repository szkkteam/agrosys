import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.plan.fieldPlan.FieldPlanOverview'

export default defineMessages({
    title: {
        id: `${scope}.header.name`,  
        defaultMessage: 'Field title',        
    },
    boundary: {
        id: `${scope}.header.boundary`,  
        defaultMessage: 'Boundary',        
    },
    area: {
        id: `${scope}.header.area`,  
        defaultMessage: 'Area',        
    },
    crop: {
        id: `${scope}.header.crop`,  
        defaultMessage: 'Crop',        
    },
    yield: {
        id: `${scope}.header.yield`,  
        defaultMessage: 'Yield',        
    },
  })
