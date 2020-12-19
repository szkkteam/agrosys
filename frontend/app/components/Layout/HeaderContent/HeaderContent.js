import React, { useState, useRef, useLayoutEffect, forwardRef } from 'react'
import PropTypes, { number } from 'prop-types'
import styled from 'styled-components'

import {
    Grid,
    Paper
} from '@material-ui/core';

import { useSplitComponents } from 'utils/hooks'
import { HeaderContentContext } from 'components'
import { useHeaderContentHeight } from './hooks'
import { useHeightDifference } from 'utils/hooks'

//height: calc(100vh - ${theme.custom.topSpacingHeight}px - ${theme.custom.pagePadding}px);
const LayoutHeaderContent = styled(Grid)`
    ${({ theme }) => `
        height: 100%;
    `}
`

const Header = styled(Grid)`
    /* border-bottom: 1px solid rgba(0,0,0,0.12); */
    padding: 0;

`

const Content = styled(forwardRef(({height: dummy = null, ...rest}, ref) => <Grid {...rest} ref={ref} /> ))`
    ${({ theme, height }) => `
    height: calc(${height}px + ${theme.spacing(1)/2}px);
    > div {
        height: 100%;
    }
    `}
`

const HeaderContent = forwardRef(({
    children
}, ref) => {
    
    const containerRef = useRef(null)
    const headerRef = useRef(null)
    const contentRef = useRef(null)
    const headerPortalRef = React.useRef(null);

    const height = useHeightDifference(containerRef, headerRef, 778)
    /*
    const {
        headerHeight,
        contentHeight
    } = useHeaderContentHeight(headerRef, contentRef)
    */
    const {
        componentA: headerComponent,
        componentB: contentComponent
    } = useSplitComponents(children)

    const contextObject = {
        contentHeight: containerRef?.current?.clientHeight ?? 0,
        headerHeight: headerRef?.current?.clientHeight ?? 0,
        contentHeight: height,
        headerPortalRef,
    }

    return (
        <LayoutHeaderContent 
            ref={containerRef}
            container
            spacing={0}
        >
            <HeaderContentContext.Provider
                value={contextObject}
            >
                <Header item xs={12}
                    //className="header"
                    ref={headerRef}
                >               
                    <Paper
                        elevation={3}
                        square
                    >
                    {_.isFunction(headerComponent)? 
                        headerComponent()
                        : 
                        headerComponent ?? null
                    }
                    </Paper>
                </Header>
                <Content
                    ref={contentRef}
                    item xs={12}
                    height={height}
                >
                    {_.isFunction(contentComponent)? 
                        contentComponent()
                        : 
                        contentComponent ?? null
                    }
                </Content>
            </HeaderContentContext.Provider>
        </LayoutHeaderContent>      
    )
})

HeaderContent.propTypes = {
    children: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.func,
    ])),
}

export default HeaderContent
