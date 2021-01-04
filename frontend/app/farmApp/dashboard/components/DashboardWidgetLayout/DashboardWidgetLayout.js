import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import {
    Paper,
    Card
} from '@material-ui/core'

import {
    WidgetContainer
} from 'components'

const Container = styled.div`
    width: 100%;
    height: 100%;
    overflow-x: hidden;
`

const FlexCard = styled(Card)`
    display: flex;
    flex-direction: column;
    //background-color: gray;
`

/**
 * TODO list:
 * 1) Boxes should be dragged by a drag icon (Probably top left)
 * 2) Boxes can be deleted, by clicking on top right icon (3 vertical dots)
 * 3) Dynamically set the max width based on the max width
 * 4) Disabled body scroll, and apply scroll on the container
 */
const DashboardWidgetLayout = ({
    widgets,
    onRemoveWidget,
    disabled=false,
    ...props
}) => {
    const containerRef = useRef(null)
    const [width, setWidth] = useState(1200)

    useLayoutEffect(() => {
        if (containerRef) {
            setWidth(containerRef.current.clientWidth)
        }
    })

    const handleLayoutChange = (layout) => {
        console.debug("Layout: ", layout)
    }

    return (
        <Container
            ref={containerRef}
        >
            <GridLayout 
                className="layout"
                //layout={layout}
                cols={12}
                rowHeight={30}
                width={width}
                isDraggable={!disabled}
                isResizable={!disabled}
                onLayoutChange={handleLayoutChange}
                //onResize={(e) => console.debug("Resize: ", e)}
            >
                { widgets && widgets.map(({Component, key, label, ...dataGrid}) => (
                    <FlexCard key={key} data-grid={dataGrid}>
                        <Component
                            keyProp={key}
                            onRemove={onRemoveWidget}
                            title={label}
                        />
                    </FlexCard>
                ))}                
            </GridLayout>
        </Container>

    )
}
//<WidgetContainer keyProp="a" gridPosition={{x: 1, y: 1}} gridSize={{w: 1, h:2}}>
/*
<StyledPaper key="b">
                    <button>Some button</button>
                </StyledPaper>
                <StyledPaper key="c">c</StyledPaper>
*/

DashboardWidgetLayout.propTypes = {
    widgets: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        Component: PropTypes.any.isRequired,
        w: PropTypes.number,
        h: PropTypes.number,
    }))
}

export default DashboardWidgetLayout