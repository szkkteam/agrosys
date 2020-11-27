import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import './headercontent.scss'

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

    return (
        <Grid 
            className="layout-header-content"
            container
            spacing={1}
        >
            <Grid item xs={12}>
                <Paper
                    style={{height: "50px"}}
                    {...paperProps}
                >
                    {header}
                </Paper>
            </Grid>
            <Grid item xs={12} className="content">
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