import React, { useState, useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
    const [headerHeight, setHeaderHeight] = useState(50)

    useLayoutEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.clientHeight)
        }
    })
    let headerChild = null
    let contentChild = null

    console.log("Header type: ", typeof(header))

    if (!header && ! content && React.Children.count(children) > 1)  {
        const childArray = React.Children.toArray(children)
        headerChild = childArray[0]   
        contentChild = childArray[1]   
    }

    let headerComponent = header? header : headerChild
    let contentComponent = content? content : contentChild


    return (
        <Grid 
            className="layout-header-content"
            container
            spacing={1}
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
                item xs={12}
                className="content"
                style={{height: `calc(100vh - ${styles.topSpacing} - ${headerHeight}px - 16px)` }}
            >
                <Paper
                    {...paperProps}
                >
                    {_.isFunction(contentComponent)? 
                        contentComponent()
                        : 
                        contentComponent
                    }
                </Paper>
            </Grid>
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