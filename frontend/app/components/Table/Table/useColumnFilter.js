import React, { useState } from 'react'

const getColumnsVisibility = (columns) => 
    columns.map(col => ({ title: col.title, hidden: 'hidden' in col? col.hidden : false }))

export default (columns) => {
 
    const [toggleColumns, setToggleColumns] = useState(getColumnsVisibility(columns))

    const filteredColumns = _.zip(columns, toggleColumns).map(mix => {
        const col = mix[0]
        const toggleCol = mix[1]

        return {
            ...col,
            hidden: toggleCol.hidden
        }
    })

    return {
        toggleColumns,
        setToggleColumns,
        filteredColumns
    }
}