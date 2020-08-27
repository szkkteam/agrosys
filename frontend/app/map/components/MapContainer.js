import React from 'react'
import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listParcelTypes } from 'reference/actions'
import { selectParcelTypesList } from 'reference/reducers/parcelTypes'

import Grid from '@material-ui/core/Grid';

import {
    SeasonSelector
} from 'season/components'

import {
    SplitButton
} from 'components/Button'

import {
    MapUpperToolbar,
} from 'map/components'

import {
    Map,
    Draw,
} from 'components/Map/components'

import {
    FormParcel,
} from 'parcel/components'

const renderButtonSwitch = (data) => {
    let retval = {
        type: "item",
        data: data,
        disabled: false,           
    }
    switch(data.code) {
        case 1: // Agricultural Parcel
            return Object.assign(retval, {
                title: "Add Agricultural Parcel",
            }) 
        case 2: // Agricultural Parcel
            return Object.assign(retval, {
                title: "Add Cadastral Parcel",
            }) 
        case 3: // Agricultural Parcel
            return Object.assign(retval, {
                title: "Add Farmer's Block",
            }) 
        case 4: // Agricultural Parcel
            return Object.assign(retval, {
                title: "Add Physical Block",
            }) 
        default:
            return {}
    }
}

class MapContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            featureInEdit: null,
            isDrawing: false,            
        }
        this.draw = React.createRef();
    }

    componentDidMount() {
        this.props.listParcelTypes.maybeTrigger()
    }

    onClick = (e, i) => {
        console.log(e,i)
        this.draw.current.drawPolygon()
        this.setState({ isDrawing: true })
    }

    onCancel = () => {
        this.draw.current.stopDraw()
        this.setState({ isDrawing: false })
    }

    onFinished = ({featureInEdit, bounds}) => {
        console.log("featureInEdit: ", featureInEdit)
        console.log("bounds: ", bounds)
    }

    onUpdate = ({featureInEdit}) => {
        console.log("featureInEdit: ", featureInEdit)
    }

    render() {
        const { parcelTypes } = this.props
        const { featureInEdit, isDrawing } = this.state
        const buttons = parcelTypes && parcelTypes.map((parcelType, id) => (
            renderButtonSwitch(parcelType)
        )).concat({ type: "divider" })

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
                    <Map
                        editable={true}
                    >
                        <Draw
                            ref={this.draw}
                            onUpdate={this.onUpdate}
                            onFinished={this.onFinished}
                        />
                        <MapUpperToolbar>
                            { isDrawing? 
                                <FormParcel
                                    action={() => null}
                                    onCancel={this.onCancel}
                                />
                                :
                                <SplitButton            
                                    options={buttons}
                                    handleClick={this.onClick}
                                />
                            }
                        </MapUpperToolbar>
                    </Map>
                </Grid>
            </Grid>
        ) 
    }
}


const withReducer = injectReducer(require('reference/reducers/parcelTypes'))
const withSaga = injectSagas(require('reference/sagas/listParcelTypes'))

const withConnect = connect(
  (state) => ({parcelTypes: selectParcelTypesList(state) }),
  (dispatch) => bindRoutineCreators({ listParcelTypes }, dispatch),
)

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MapContainer)