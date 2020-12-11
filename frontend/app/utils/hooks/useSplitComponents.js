import React, { useState, useRef, useEffect, useMemo } from 'react'

export default (children) => {
    const components = useMemo(() => {
        let components = {
            componentA: null,
            componentB: null
        }

        if (React.Children.count(children) > 1)  {
            const childArray = React.Children.toArray(children)
    
            components = {
                componentA: childArray[0],
                componentB: childArray[1]
            }
        }
        return components
    }, [children])
    
    return components

}