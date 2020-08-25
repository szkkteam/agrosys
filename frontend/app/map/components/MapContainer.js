import React from 'react'
import Grid from '@material-ui/core/Grid';

import {
    SeasonSelector
} from 'season/components'

import {
    MapToolbar,
} from 'map/components'

import {
    Map
} from 'components/Map/components'

const buttons = [
    {
        title: 'Button 1',
        key: 'SomeKey',
        disabled: false,
        props: {},
    },
    {
        title: 'Button 2',
        key: 'SomeKey',
        disabled: false,
        props: {},
    },
    {
        title: 'Button 3',
        key: 'SomeKey',
        disabled: true,
        props: {},
    },
]

export default class MapContainer extends React.Component {

    render() {
        return (
            <Grid
                container
                direction="row"
            >
                <Grid item sm={2}>
                    <SeasonSelector
                    />
                    <div>
                        Parcel list
                    </div>
                </Grid>
                <Grid item sm={10}>
                    <Map>
                        <MapToolbar
                            buttons={buttons}
                        />
                    </Map>
                </Grid>
            </Grid>
        )
    }
}
