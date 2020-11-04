import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import './headercontent.scss'

export default ({
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
            container
            spacing={1}
        >
            <Grid item xs={12}>
                <Paper
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
