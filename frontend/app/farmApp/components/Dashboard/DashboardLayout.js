import React, { useRef, useEffect, useMemo, useState } from 'react'
import { useTheme } from "@material-ui/core/styles";
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import sizeMe, { SizeMe } from 'react-sizeme'
import { useForceUpdate } from 'utils/hooks'
import DashboardContext from './DashboardContext'

import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { useMap } from 'react-leaflet';

const Container = ({
    ...props
}) => {
    return (
        <SizeMe monitorWidth noPlaceholder>
            {({ size }) => 
                {
                    console.debug("Resize: ", size)
                    return (
                        <DashboardLayout width={size.width} {...props} />
                    )
                }
                
            }
        </SizeMe>
    )
}

const DashboardLayout = ({
    components,
    layouts: initialLayouts={},
    disabled=false,
    children,
    width,
    ...props
}) => {
    const theme = useTheme()

    const [layouts, setLayouts] = useState(initialLayouts)

    const forceUpdate = useForceUpdate()

    useEffect(() => {
        forceUpdate()
    }, []) 

    const handleLayoutChange = (layout, layouts) => {
        console.debug("Layout: ", layout)
        setLayouts(layouts)
    }

    const breakpoints = {
        //xl: theme.breakpoints.values.xl,
        lg: theme.breakpoints.values.xl - 106, // TODO: This is a hard coded value, should be calculated
        md: theme.breakpoints.values.lg - 106,
        sm: theme.breakpoints.values.md - 106,
        xs: theme.breakpoints.values.sm - 106,
        xxs: theme.breakpoints.values.xs,
    }
    
    const cols = {
        //xl: 16,
        lg: 12,
        md: 12,
        sm: 6,
        xs: 4,
        xxs: 2
    }
    console.debug("Breakpoints: ", breakpoints)
    console.debug("Theme breakpoints: ", theme.breakpoints.values)

    const contextObject = {
        breakpoints,
        cols
    }

    const childrenArray = useMemo(() => {
        return components && components.map(({component, key}, i) => (
            <div key={key}>{component}</div>
        ))
        
    }, [components])


    return (
        <DashboardContext.Provider value={contextObject}>
            { width ? <ResponsiveGridLayout 
                className="layout"
                layouts={layouts}
                breakpoints={breakpoints}
                cols={cols}
                isDraggable={!disabled}
                isResizable={!disabled}
                rowHeight={30}
                width={width}
                {...props}
                onLayoutChange={handleLayoutChange}
                onBreakpointChange={(newBreakpoint) => {
                    console.debug(newBreakpoint);
                }}
                
            >
                {childrenArray}
            </ResponsiveGridLayout> : <div/> }
        </DashboardContext.Provider>
    )
}

DashboardLayout.propTypes = {
    components: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        component: PropTypes.element.isRequired
    })).isRequired
}

export default Container