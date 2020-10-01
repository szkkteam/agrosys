import React from 'react'
import Grid from '@material-ui/core/Grid';

import {
    ParcelListContainer,
} from 'parcel/components'

import {
    ProductionCreateContainer
} from 'production/components'

export default (
    
) => {
    return (
        <Grid
            container
            direction="row"
            style={{overflowX: "hidden", maxHeight: "900px"}}
        >
            <Grid item sm={2}>
                <ParcelListContainer />
            </Grid>
            <Grid item sm={10}>
                <ProductionCreateContainer />
            </Grid>
        </Grid>
    )
}
