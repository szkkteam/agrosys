import React from 'react'
import { PageContent } from 'components'
import Helmet from 'react-helmet'

import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { 
    SplitPane,
    EditableMap,
    MapEditable,
    MapCreateShape,
    FormCreateField,
} from 'field/components'
import { getArea } from 'field/components/MapComponents/utils'

import reduxForm from 'redux-form/es/reduxForm'
import { EmailField, PasswordField, TextField } from 'components/Form'


class TestComponent extends React.Component {

    render() {
        return (
            <Map 
                center={[45.4, -75.7]}
                zoom={12}
                editable={true}
            >
                <TileLayer
                    url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                    attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                    id='mapbox.satellite'
                />
                <MapCreateShape
                />
            </Map>
        )
    }
}

export default class FieldCreate extends React.Component { 
 
    render() {
        return (
            <PageContent>
                <Helmet>
                    <title>
                        Field - New
                    </title>
                    <link rel="stylesheet" href="//unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
                    <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                    <script src="https://npmcdn.com/leaflet.path.drag/src/Path.Drag.js"></script>
                </Helmet>
                <SplitPane
                    leftSize={9}
                    rightSize={3}
                >
                    <TestComponent/>
                    <FormCreateField />
                </SplitPane>
            </PageContent>
        )
    }
}
