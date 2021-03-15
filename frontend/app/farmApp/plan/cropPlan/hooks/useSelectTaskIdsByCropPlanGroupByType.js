import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getTaskIdsByCropPlanGroupByType } from '../selectors'

export default (cropPlanIds) => {
    const cachedSelector = useMemo(
        getTaskIdsByCropPlanGroupByType,
        []
    )

    return useSelector(state =>
        cachedSelector(state, cropPlanIds)
    )
}