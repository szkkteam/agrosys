import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getUserCrop } from '../selectors'

export default (cropId) => {
    const cachedSelector = useMemo(
        getUserCrop,
        []
    )

    return useSelector(state =>
        cachedSelector(state, cropId)
    )
}