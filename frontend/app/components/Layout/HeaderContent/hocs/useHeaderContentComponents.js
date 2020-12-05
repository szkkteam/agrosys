import React, { useState, useRef, useLayoutEffect, forwardRef } from 'react'

export default (header, content, children) => {

    let headerChild = null
    let contentChild = null

    if (!header && ! content && React.Children.count(children) > 1)  {
        const childArray = React.Children.toArray(children)
        headerChild = childArray[0]   
        contentChild = childArray[1]   
    }

    const headerComponent = header? header : headerChild
    const contentComponent = content? content : contentChild

    return {
        headerComponent,
        contentComponent
    }

}