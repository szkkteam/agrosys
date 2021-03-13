import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { mapViewportChanged } from '../actions'

export default () => {
    const dispatch = useDispatch()

    return (bounds) => {
        dispatch(mapViewportChanged(bounds))
    }
}
