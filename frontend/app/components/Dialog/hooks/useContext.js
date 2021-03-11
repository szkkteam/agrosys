import React, { useContext } from 'react'
import Context from '../Context'

export default () => {
    const context = useContext(Context)
    if (!context) {
        throw new Error(
        `Modal compound components cannot be rendered outside the ModalProvider component`,
        )
    }
    return context
}