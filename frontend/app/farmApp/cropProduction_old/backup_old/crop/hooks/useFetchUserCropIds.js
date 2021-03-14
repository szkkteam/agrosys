import React, { useState, useEffect } from 'react'
import { useFetch, useInjectSaga, useInjectReducer } from 'utils/hooks'
import { listUserCrop } from '../actions'
import { getUserCropIds } from '../selectors'

export default () => {
    useInjectSaga(require('../sagas/listUserCrop'))
    useInjectReducer(require('../reducers/userCropRequest'))
    
    return useFetch(listUserCrop, getUserCropIds)
}