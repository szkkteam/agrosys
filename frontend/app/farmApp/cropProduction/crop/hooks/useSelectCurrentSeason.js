import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getCurrentSeasonByUserCropId } from './../selectors'

export default (userCropId) => {
    const cachedSelector = useMemo(
        getCurrentSeasonByUserCropId,
        []
    )

    return useSelector(state =>
        cachedSelector(state, userCropId)
    )
}