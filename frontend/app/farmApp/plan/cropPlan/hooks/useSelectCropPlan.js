import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getCropPlan } from '../selectors'

export default (cropPlanId) => {
    const cachedSelector = useMemo(
        getCropPlan,
        []
    )

    return useSelector(state =>
        cachedSelector(state, cropPlanId)
    )
}