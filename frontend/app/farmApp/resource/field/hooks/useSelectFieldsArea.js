import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getSelectedFieldsArea } from '../selectors'

export default (fieldIds) => {
    const cachedSelector = useMemo(
        getSelectedFieldsArea,
        []
    )

    return useSelector(state =>
        cachedSelector(state, fieldIds)
    )
}