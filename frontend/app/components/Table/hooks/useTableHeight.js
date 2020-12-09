import React, { useEffect, useContext, useState, useRef, useLayoutEffect } from 'react'

import { HeaderContentContext } from 'components'

export default (headerRef, parentRef, siblingRef) => {
    const [height, setHeight] = useState(580)

    const { contentHeight } = useContext(HeaderContentContext)

    useLayoutEffect(() => {
        console.debug("headerRef: ", headerRef)
        if (headerRef.current) {
            const { clientHeight } = headerRef.current

            setHeight(contentHeight - clientHeight - (siblingRef?.current?.clientHeight ?? 0) - 30)
        }
    }, [parentRef, headerRef])

    return height
}