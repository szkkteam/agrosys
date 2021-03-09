import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { mapEventAdd } from '../actions'

export default () => {
    const dispatch = useDispatch()

    return (bounds, flyTo=true) => {

        const data = {
            type: flyTo? "fly-to-bounds" : "fit-to-bounds",
            config: {
                bounds: bounds,
            }
        }
        
        dispatch(mapEventAdd(data))
    }
}
