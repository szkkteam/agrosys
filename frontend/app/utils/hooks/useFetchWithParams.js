import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default (action, selector, params, force=false) => {

    const dispatch = useDispatch()

    const cachedSelector = useMemo(
        selector,
        []
    )
    /*
    const [payload, setPayload] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    */

    useEffect(() => {
        // Trigger the action
        if (force) {
            dispatch(action.trigger(params))    
        } else {
            dispatch(action.maybeTrigger(params))
        }
    }, [])

    return useSelector(state =>
        cachedSelector(state, params)
    )
}