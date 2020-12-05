import React, { useState, useRef, useLayoutEffect, forwardRef } from 'react'
import PropTypes, { number } from 'prop-types'
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components'

import { HeaderContentContext } from 'components'

import {
    useHeaderContentComponents,
    useHeaderContentHeight
 } from './hocs'

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
        headerComponent,
        contentComponent
    } = useHeaderContentComponents(header, content, children)


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
/*
<div
            className="layout-header-content"
        >
            <HeaderContentContext.Provider
                value={contextObject}
            >
                <div
                    className="header"
                    ref={headerRef}
                >
                    {_.isFunction(headerComponent)? 
                        headerComponent()
                        : 
                        headerComponent
                    }
                </div>
                <div
                    ref={contentRef}
                    className="content"
                    style={{height: `calc(100vh - ${styles.topSpacing} - ${headerHeight}px - 16px)` }}
                >
                    {_.isFunction(contentComponent)? 
                        contentComponent()
                        : 
                        contentComponent
                    }
                </div>
            </HeaderContentContext.Provider>
        </div>    
*/



/*
<Grid 
            className="layout-header-content"
            container
            spacing={1}
        >
            <HeaderContentContext.Provider
                value={contextObject}
            >
                <Grid item xs={12}>
                    <Paper
                        className="header"
                        ref={headerRef}
                        variant="outlined"
                        //style={{height: `${headerHeight}px`}}
                        {...paperProps}
                    >
                        {_.isFunction(headerComponent)? 
                            headerComponent()
                            : 
                            headerComponent
                        }
                    </Paper>
                </Grid>
                <Grid
                    ref={contentRef}
                    item xs={12}
                    className="content"
                    style={{height: `calc(100vh - ${styles.topSpacing} - ${headerHeight}px - 16px)` }}
                >
                    {_.isFunction(contentComponent)? 
                        contentComponent()
                        : 
                        contentComponent
                    }
                </Grid>
            </HeaderContentContext.Provider>
        </Grid>
*/