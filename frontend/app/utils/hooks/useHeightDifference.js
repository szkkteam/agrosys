import React, { useLayoutEffect, useMemo, useState, useRef } from 'react'

export default (container, child, defaultHeight = 700) => {
    const [height, setHeight] = useState(defaultHeight)

    useLayoutEffect(() => {
        const containerHeight = _.isInteger(container)? container : container?.current && 'current' in container ? container.current.clientHeight : null
        const childHeight = _.isInteger(child)? child : child?.current && 'current' in child ? child.current.clientHeight : null

        console.debug("containerHeight: ", containerHeight)
        console.debug("childHeight: ", childHeight)

        if (containerHeight && childHeight) {     
            setHeight(containerHeight - childHeight)
        }
        
    }, [container, child])

    const cachedHeight = useMemo(() => height, [height])

    return cachedHeight
}