import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getField } from '../selectors'

export default (fieldId) => {
    const cachedSelector = useMemo(
        getField,
        []
    )

    return useSelector(state =>
        cachedSelector(state, fieldId)
    )
}