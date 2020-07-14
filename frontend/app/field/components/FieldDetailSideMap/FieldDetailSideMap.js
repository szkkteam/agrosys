import React from 'react'
import { GeoJSON } from "react-leaflet";
import Grid from '@material-ui/core/Grid';

import { 
    Map,
} from 'map/components'

import './fielddetailsidemap.scss'

export default class FieldDetailSideMap extends React.Component 
{

    render() {
        const { field } = this.props
        const lastFieldDetail = field.fields[field.fields.length - 1]
        console.log("lastFieldDetail: ", lastFieldDetail)
        return(
            <Grid 
                container
                spacing={0}
                direction="row"
                alignItems="flex-start"
            >
                <Grid item xs={1}>
                    <div>Carousel with snapshots</div>
                </Grid>
                <Grid item xs={11}>
                    <Map>    
                        <GeoJSON 
                            key={lastFieldDetail.id}
                            data={lastFieldDetail.shape} />
                    </Map>
                </Grid>
            </Grid>
        )
    }
}
