import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import './content.scss'

export default ({
    children
}) => {
    const paperProps = {
        variant: 'outlined',
        elevation: 1,
        square: false,
    }

    return (
        <Grid
            className="layout-content"
            container
            spacing={1}
        >
            <Grid item xs={12} className="content">
                <Paper
                    {...paperProps}
                >
                    {children}
                </Paper>
            </Grid>
        </Grid>
    )
}
