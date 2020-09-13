import React from 'react'
import Grid from '@material-ui/core/Grid';

import {
    TemplateCreateContainer
} from 'template/components'

export default (
    
) => {
    return (
        <Grid
            container
            direction="row"
            style={{overflowX: "hidden", maxHeight: "900px"}}
        >
            <Grid item sm={2}>
                <div>
                    Template List
                </div>
            </Grid>
            <Grid item sm={10}>
                <TemplateCreateContainer />
            </Grid>
        </Grid>
    )
}
