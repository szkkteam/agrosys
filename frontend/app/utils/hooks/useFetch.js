import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default (action, selector, force=false) => {

    const dispatch = useDispatch()
    /*
    const [payload, setPayload] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    */

    useEffect(() => {
        // Trigger the action
        if (force) {
            dispatch(action.trigger())    
        } else {
            dispatch(action.maybeTrigger())
        }
    }, [])

    return useSelector(selector)
}