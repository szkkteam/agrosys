import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.plan.template.TemplateFeatureSection'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Select features',        
    },
    fertalizer: {
        id: `${scope}.feature.fertalizer`,  
        defaultMessage: 'Fertalizer',        
    },
    chemicalTreatment: {
        id: `${scope}.feature.chemicalTreatment`,  
        defaultMessage: 'Chemical treatments',        
    },
    
  })
