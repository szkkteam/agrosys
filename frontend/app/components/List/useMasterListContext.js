import React, { useContext } from 'react'

import MasterListContext from './MasterListContext'

export default () => {
    const context = useContext(MasterListContext)
    if (!context) {
        throw new Error ('MasterListItem compound components cannot be rendered outside the MasterList component')
    }
    return context
}