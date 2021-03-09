import React, { useState, useEffect } from 'react'
import { useInjectReducer } from 'utils/hooks'

export default () => {
    useInjectReducer(require('../reducers/mapEvents'))
}