import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getSeasonById } from './../selectors'

export default (id) => {
    const cachedSelector = useMemo(
        getSeasonById,
        []
    )

    return useSelector(state =>
        cachedSelector(state, id)
    )
}