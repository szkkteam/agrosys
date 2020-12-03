import { defineMessages } from 'react-intl'

export const scope = 'app.farmApp.machinery.MachineryLayout'

export default defineMessages({
    left: {
        id: `${scope}.MachineryTab.title`,  
        defaultMessage: 'Machineries',
    },
    right: {
        id: `${scope}.ReservationTab.title`,  
        defaultMessage: 'Reservations',
    },
  })