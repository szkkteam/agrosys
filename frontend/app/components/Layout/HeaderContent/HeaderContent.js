import React, { useState, useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import styles from './headercontent.scss'

const HeaderContent = ({
    header,
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
                    {header}
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
                    {children || content}
                </Paper>
            </Grid>
        </Grid>
    )
}

HeaderContent.propTypes = {
    header: PropTypes.element.isRequired,
    content: PropTypes.element,
    children: PropTypes.element
}

export default HeaderContent