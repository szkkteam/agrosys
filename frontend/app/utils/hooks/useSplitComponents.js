import React, { useState, useRef, useLayoutEffect, forwardRef } from 'react'

export default (componentA, componentB, children) => {

    let componentAChild = null
    let componentBChild = null

    if (!componentA && ! componentB && React.Children.count(children) > 1)  {
        const childArray = React.Children.toArray(children)
        componentAChild = childArray[0]   
        componentBChild = childArray[1]   
    }

    componentAChild = componentA? componentA : componentAChild
    componentBChild = componentB? componentB : componentBChild

    return {
        componentAChild,
        componentBChild
    }

}