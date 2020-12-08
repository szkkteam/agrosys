import React, { useState, useRef, useLayoutEffect, forwardRef } from 'react'

export default (headerRef, contentRef, defaultHeaderHeight = 50, defaultContentHeight = 700) => {

    const [headerHeight, setHeaderHeight] = useState(defaultHeaderHeight)
    const [contentHeight, setContentHeight] = useState(defaultContentHeight)

    useLayoutEffect(() => {
        if (headerRef.current) {
            const { clientHeight } = headerRef.current
            setHeaderHeight(clientHeight)
        }
        if (contentRef.current) {
            const { clientHeight } = contentRef.current
            setContentHeight(clientHeight)
        }
    })
    return {
        headerHeight,
        contentHeight
    }
}