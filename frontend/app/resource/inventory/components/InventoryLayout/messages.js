import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.inventory.InventoryLayout'

export default defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Inventory items',
    },
    searchButton: {
        id: `${scope}.SearchButton.title`,  
        defaultMessage: 'Search...',
    },
    addNewTitle: {
        id: `${scope}.AddButton.title`,  
        defaultMessage: 'Add new',
    },
  })