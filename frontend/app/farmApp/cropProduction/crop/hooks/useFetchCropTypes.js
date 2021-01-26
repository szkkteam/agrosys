import React, { useState, useEffect } from 'react'
import { useFetch, useInjectSaga, useInjectReducer } from 'utils/hooks'
import { listCropType } from '../actions'
import { getCropTypes } from '../selectors'

export default () => {
    useInjectSaga(require('../sagas/listCropType'))
    useInjectReducer(require('../reducers/cropTypeRequest'))
    
    return useFetch(listCropType, getCropTypes)
}