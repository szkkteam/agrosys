import React, { useContext } from 'react'

import TableContext from '../TableContext'

export default () => {
    const context = useContext(TableContext)
    if (!context) {
        throw new Error ('Table compound components cannot be rendered outside the Table component')
    }
    return context
}