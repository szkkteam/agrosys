import React from 'react'

const defaultValues = {
    isDrawerOpen: true,
    handleDrawerOpen: () => null,
    handleDrawerClose: () => null,
}

export default React.createContext(defaultValues)