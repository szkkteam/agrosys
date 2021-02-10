import React, { useState, useEffect } from 'react'
import { useFetch, useInjectSaga, useInjectReducer } from 'utils/hooks'
import { listField } from '../actions'
import { getFieldIds } from '../selectors'

export default () => {
    useInjectSaga(require('../sagas/listField'))
    useInjectReducer(require('../reducers/fieldRequest'))
    
    return useFetch(listField, getFieldIds)
}