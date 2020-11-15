import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.block.BlockFormPages'
export const drawPage = `${scope}.BlockDrawPage`
export const editPage = `${scope}.BlockEditPage`
export const generalTab = `${editPage}.BlockEditTabGeneral`
export const lpisTab = `${editPage}.BlockEditTabLPIS`

export default defineMessages({
    borderEditTitle: {
        id: `${editPage}.title`,  
        defaultMessage: 'Border editing',
    },
    borderEditDesc: {
        id: `${editPage}.description`,  
        defaultMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in tortor blandit diam dapibus gravida. Nulla eu ligula massa. Sed sed porta enim, in feugiat diam.',
    },
    borderEditButtonTitle: {
        id: `${editPage}.button.title`,  
        defaultMessage: 'edit borders',
    },
    generalTabTitle: {
        id: `${generalTab}.title`,  
        defaultMessage: 'general',
    },
    fieldBlockTitle: {
        id: `${generalTab}.form.blockTitle`,  
        defaultMessage: 'Block Title',
    },
    fieldLocation: {
        id: `${generalTab}.form.location`,  
        defaultMessage: 'Location',
    },
    fieldUsableArea: {
        id: `${generalTab}.form.usableArea`,  
        defaultMessage: 'Usable Area',
    },
    fieldSoilType: {
        id: `${generalTab}.form.soilType`,  
        defaultMessage: 'Soil Type',
    },
    fieldAgriculturalType: {
        id: `${generalTab}.form.agriculturalType`,  
        defaultMessage: 'Agricultural Type',
    },
    fieldOwnership: {
        id: `${generalTab}.form.ownership`,  
        defaultMessage: 'Ownership',
    },
    lpisTabTitle: {
        id: `${lpisTab}.title`,  
        defaultMessage: 'mepar',
    },
    fieldCadastralPlot: {
        id: `${lpisTab}.form.cadastralPlot`,  
        defaultMessage: 'Cadastral Plot',
    },
    fieldLpisNumber: {
        id: `${lpisTab}.form.lpisNumber`,  
        defaultMessage: 'Mepar Number',
    },
    fieldValidFrom: {
        id: `${lpisTab}.form.validFrom`,  
        defaultMessage: 'Valid From',
    },
    fieldValidTo: {
        id: `${lpisTab}.form.validTo`,  
        defaultMessage: 'Valid To',
    },
    fieldNatura2000: {
        id: `${lpisTab}.form.natura2000`,  
        defaultMessage: 'Natura 2000',
    },
    fieldNitrateSensitive: {
        id: `${lpisTab}.form.nitrateSensitive`,  
        defaultMessage: 'Nitrate Sensitive',
    },
    field12Slope: {
        id: `${lpisTab}.form.12Slpoe`,  
        defaultMessage: '12% Slope',
    },
  })