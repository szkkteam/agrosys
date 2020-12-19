import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.block.BlockDetailPage.BlockTabGeneral'


export default defineMessages({    
    fieldBlockTitle: {
        id: `${scope}.form.blockTitle`,  
        defaultMessage: 'Block Title',
    },
    fieldLocation: {
        id: `${scope}.form.location`,  
        defaultMessage: 'Location',
    },
    fieldUsableArea: {
        id: `${scope}.form.usableArea`,  
        defaultMessage: 'Usable Area',
    },
    fieldSoilType: {
        id: `${scope}.form.soilType`,  
        defaultMessage: 'Soil Type',
    },
    fieldAgriculturalType: {
        id: `${scope}.form.agriculturalType`,  
        defaultMessage: 'Agricultural Type',
    },
    fieldOwnership: {
        id: `${scope}.form.ownership`,  
        defaultMessage: 'Ownership',
    },
  })