import React from 'react'

const defaultValues = {
    open: true,
    handleCancel: null,
    handleConfirm: null,
    handleAction: null,
}

export default React.createContext(defaultValues)