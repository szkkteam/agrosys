import React from 'react'

const defaultValues = {
    topBottomPadding: 15,
    toggleColumns: null,
    onColumnChanged: null,    
    columns: [],
}


export default React.createContext(defaultValues)