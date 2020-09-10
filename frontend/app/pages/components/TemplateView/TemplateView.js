import React from 'react'
import Grid from '@material-ui/core/Grid';

export default (
    
) => {
    return (
        <Grid
            container
            direction="row"
            style={{overflowY: "hidden", maxHeight: "800px"}}
        >
            <Grid item sm={2}>
                <div>
                    Template List
                </div>
            </Grid>
            <Grid item sm={10}>
                <div>Template detail</div>
            </Grid>
        </Grid>
    )
}
