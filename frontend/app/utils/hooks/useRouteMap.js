import React, { useMemo } from 'react'
import { ROUTE_MAP } from 'routes'

export default (to) => {
    const route = useMemo(() => {
        return ROUTE_MAP[to]
    }, [to])
    
    return route

}