import React, { useContext } from 'react'
import ModalContext from '../ModalContext'

export default () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error(
        `Modal compound components cannot be rendered outside the ModalProvider component`,
        )
    }
    return context
}