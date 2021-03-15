import React, { useState, useEffect } from 'react'
import { useFetch, useInjectSaga, useInjectReducer } from 'utils/hooks'
import { listCropPlan } from '../actions'

export default () => {
    useInjectSaga(require('../sagas/listCropPlan'))
    useInjectReducer(require('../reducers/cropPlanRequest'))
    
    return useFetch(listCropPlan)
}