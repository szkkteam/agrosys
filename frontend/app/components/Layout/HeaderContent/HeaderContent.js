import React, { useState, useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { HeaderContentContext } from 'components'

import styles from './headercontent.scss'

const HeaderContent = ({
    header=null,
    content=null,
    children
}) => {
    const paperProps = {
        variant: 'outlined',
        elevation: 1,
        square: false,
    }

    const headerRef = useRef(null)
    const contentRef = useRef(null)

    const headerPortalRef = React.useRef(null);
    const [headerHeight, setHeaderHeight] = useState(50)
    const [contentHeight, setContentHeight] = useState(700)

    let headerChild = null
    let contentChild = null

    if (!header && ! content && React.Children.count(children) > 1)  {
        const childArray = React.Children.toArray(children)
        headerChild = childArray[0]   
        contentChild = childArray[1]   
    }

    let headerComponent = header? header : headerChild
    let contentComponent = content? content : contentChild


    useLayoutEffect(() => {
        if (headerRef.current) {
            const { clientHeight } = headerRef.current
            console.log("Header height: ", clientHeight)
            setHeaderHeight(clientHeight)
        }
        if (contentRef.current) {
            const { clientHeight } = contentRef.current
            setContentHeight(clientHeight)
        }
    })

    const contextObject = {
        headerHeight,
        contentHeight,
        headerPortalRef,
    }

    return (
        <Grid 
            className="layout-header-content"
            container
            spacing={1}
        >
            <HeaderContentContext.Provider
                value={contextObject}
            >
                <Grid item xs={12}
                    className="header"
                    ref={headerRef}
                >               
                    {_.isFunction(headerComponent)? 
                        headerComponent()
                        : 
                        headerComponent
                    }
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