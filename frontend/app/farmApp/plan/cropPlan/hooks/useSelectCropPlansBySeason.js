import React, { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
//import { useFetchWithParams, useInjectSaga, useInjectReducer } from 'utils/hooks'
import { getCropPlansBySeason } from '../selectors'
import useFetchCropPlans from './useFetchCropPlans'

export default (season) => {
    const dummy = useFetchCropPlans()

    const cachedSelector = useMemo(
        getCropPlansBySeason,
        []
    )
    
    return useSelector(state =>
        cachedSelector(state, season)
    )
}