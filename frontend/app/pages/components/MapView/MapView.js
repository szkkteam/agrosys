import React from 'react'
import Grid from '@material-ui/core/Grid';

import {
    SeasonContainer
} from 'season/components'

import {
    MapContainer,
} from 'components/Map/components'

import {
    ParcelListContainer,
    AddParcelButtonContainer,
} from 'parcel/components'

export default (
    
) => {
    return (
        <Grid
            container
            direction="row"
            style={{overflowY: "hidden", maxHeight: "800px"}}
        >
            <Grid item sm={2}>
                <SeasonContainer
                /> 
                <div> 
                    <ParcelListContainer
                    />
                </div>
                <div style={{height: "82%", position: "relative"}}>
                    <div style={{position: "absolute", bottom: "0px"}}>
                        <AddParcelButtonContainer       
                        />
                    </div>
                </div>
            </Grid>
            <Grid item sm={10}>
                <MapContainer
                />                 
            </Grid>
        </Grid>
    )
}
