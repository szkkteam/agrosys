import React from 'react'
import Grid from '@material-ui/core/Grid';

import {
    Map
} from 'components/Map/components'

export default class MapContainer extends React.Component {

    render() {
        return (
            <Grid
                container
                direction="row"
            >
                <Grid item sm={3}>
                    Left Pane
                </Grid>
                <Grid item sm={9}>
                    <Map
                    />
                </Grid>
            </Grid>
        )
    }
}
