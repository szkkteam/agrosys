import React, { useState, useRef, useLayoutEffect, forwardRef } from 'react'
import PropTypes, { number } from 'prop-types'
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components'

import { useSplitComponents } from 'utils/hooks'
import { HeaderContentContext } from 'components'
import { useHeaderContentHeight } from './hooks'

const LayoutHeaderContent = styled(Grid)`
    ${({ theme }) => `
    height: calc(100vh - ${theme.custom.topSpacingHeight}px - ${theme.custom.pagePadding}px);
    `}
`

const Header = styled(Grid)`
    border-bottom: 1px solid rgba(0,0,0,0.12);
`

const Content = styled(forwardRef(({headerHeight: dummy = null, ...rest}, ref) => <Grid {...rest} ref={ref} /> ))`
    ${({ theme, headerHeight }) => `
    height: calc(100vh - ${theme.custom.topSpacingHeight}px - ${headerHeight}px);
    > div {
        height: 100%;
    }
    `}
`

const HeaderContent = ({
    header=null,
    content=null,
    children
}) => {
    
    const headerRef = useRef(null)
    const contentRef = useRef(null)
    const headerPortalRef = React.useRef(null);

    const {
        headerHeight,
        contentHeight
    } = useHeaderContentHeight(headerRef, contentRef)

    const {
        componentAChild: headerComponent,
        componentBChild: contentComponent
    } = useSplitComponents(header, content, children)


    const contextObject = {
        headerHeight,
        contentHeight,
        headerPortalRef,
    }

    return (
        <LayoutHeaderContent 
            container
            spacing={1}
        >
            <HeaderContentContext.Provider
                value={contextObject}
            >
                <Header item xs={12}
                    //className="header"
                    ref={headerRef}
                >               
                    {_.isFunction(headerComponent)? 
                        headerComponent()
                        : 
                        headerComponent
                    }
                </Header>
                <Content
                    ref={contentRef}
                    item xs={12}
                    headerHeight={headerHeight}
                >
                    {_.isFunction(contentComponent)? 
                        contentComponent()
                        : 
                        contentComponent
                    }
                </Content>
            </HeaderContentContext.Provider>
        </LayoutHeaderContent>      
    )
}

HeaderContent.propTypes = {
    header: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
        PropTypes.oneOf([null])
    ]),
    content: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
    ]),
    children: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.func,
    ])),
}

export default HeaderContent
