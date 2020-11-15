import React from 'react'

const defaultValues = {
    isDrawerOpen: true,
    isAuthenticated: false,
    handleDrawerOpen: () => null,
    handleDrawerClose: () => null,
}

export default React.createContext(defaultValues)