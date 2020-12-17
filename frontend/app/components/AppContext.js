import React from 'react'

const defaultValues = {
    appBarTabsRef: null,
    setPageTitle: () => null,
    appBarHeight: 64,
}

export default React.createContext(defaultValues)