import React, { useContext } from 'react'

import PanelContext from './Context'

export default () => {
    const context = useContext(PanelContext)
    if (!context) {
        throw new Error ('CropProductionSeasonPanel compound components cannot be rendered outside the MasterList component')
    }
    return context
}