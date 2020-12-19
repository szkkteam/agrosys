import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export default ({
    title,
    header,
    children,
    // TODO: Get prop prevUrl to determine where to redirect
    ...props
}) => {

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper>
                        {header}
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        {children}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}