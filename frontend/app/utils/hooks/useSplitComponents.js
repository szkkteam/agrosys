import React, { useState, useRef, useEffect, useMemo } from 'react'

export default (children, num=2) => {
    const components = useMemo(() => {
        let components = []

        if (React.Children.count(children) >= num)  {
            const childArray = React.Children.toArray(children)
    
            components = childArray
        }
        return components
    }, [children])
    
    return components

}