import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getTasksByCropPlan } from '../selectors'

export default (cropPlanId) => {
    const cachedSelector = useMemo(
        getTasksByCropPlan,
        []
    )

    return useSelector(state =>
        cachedSelector(state, cropPlanId)
    )
}