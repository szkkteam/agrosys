import React, { useRef, useState, useContext } from 'react'
import { MODAL_TYPE_CONFIRM, MODAL_TYPE_CANCEL } from 'site/modalResultTypes'
import { usePushModalWindow } from 'utils/hooks'

const dummyFunction = () => null

export default (dialog, confirm=dummyFunction, cancel=dummyFunction) => {
    const push = usePushModalWindow()

    return (params={}, otherParams) => {
        return push(dialog, params).then(({payload = {}, status}) => {
            if (status === MODAL_TYPE_CONFIRM) {
                confirm(payload, status, otherParams)                
            } else if (status === MODAL_TYPE_CANCEL) {
                cancel(payload, status, otherParams)
            } else {
                /* Nothing */
            }
        })
    }
}
