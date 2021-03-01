import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const PanelContainer = forwardRef(({
    defaultOpen=null,
    children,
    ...props
}, ref) => {
    const [expanded, setExpanded] = useState(defaultOpen !== null? {[defaultOpen]: true}: {})

    const handleExpandChange = (i) => () => {
        if (expanded[i] !== undefined) setExpanded({})
        else setExpanded({[i]: true})
    }

    useImperativeHandle(ref, () => ({
        expand(i) {
            setExpanded({[i]: true})
        },        
    }));
 
    return (
        <>
            {React.Children.map(children, (child, i) => (
                React.cloneElement(child, {
                    key: i,
                    expanded: expanded[i] !== undefined,
                    onExpandChange: handleExpandChange(i)
                })
            ))}
        </>
    )
})

PanelContainer.propTypes = {
    action: PropTypes.element,
    defaultOpen: PropTypes.number,
}


export default PanelContainer