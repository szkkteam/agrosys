import React from 'react'
import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { 
    createSeasonParcel,
    listSeasonParcel,
} from 'parcel/actions'
import { mapEvents } from 'components/Map/actions'
import { selectSeasonParcelsList } from 'parcel/reducers/parcels'
//import { selectSelectedSeasons } from 'season/reducers/seasons'

import Grid from '@material-ui/core/Grid';

import {
    SeasonSelector
} from 'season/components'

import {
    MapUpperToolbar,
    AddParcelButton
} from 'map/components'

import {
    Map,
    Draw,
    Feature,
} from 'components/Map/components'

import {
    FormParcel,
} from 'parcel/components'


class MapContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            formInitialValues: {
                title: "",
                geometry: null,
                eligibleArea: 0,
                totalArea: 0,
                referenceParcelTypeId: 0,
            },
            //featureInEdit: null,
            isDrawing: false,            
            selectedParcel: null,
        }
        this.draw = React.createRef();
    }

    componentDidMount() {
        const { listSeasonParcel } = this.props
        listSeasonParcel && listSeasonParcel.maybeTrigger()
    }

    onClick = (e, i) => {        
        console.log(e,i)
        this.draw.current.drawPolygon()
        this.setState({ 
            isDrawing: true,
            formInitialValues: {
                ...this.state.formInitialValues,
                referenceParcelTypeId: i.data.id,
            }
        })

    }

    onSelect = (parcel, e) => {
        this.setState({ 
            selectedParcel: (this.state.selectedParcel && parcel.id == this.state.selectedParcel.id? null : parcel) 
        })
    }

    onCancel = () => {
        this.draw.current.stopDraw()
        this.setState({ 
                isDrawing: false,
                formInitialValues: {
                    geometry: null,
                    eligibleArea: 0,
                    totalArea: 0,
                },
            })
    }

    onFinished = ({featureInEdit, bounds}) => {
        const { mapEvents } = this.props
        this.setState({ formInitialValues: {
            ...this.state.formInitialValues,
                geometry: featureInEdit.geometry,
                eligibleArea: featureInEdit.area,
                totalArea: featureInEdit.area,
        }})
        // Force the map bounds to the new geometry
        mapEvents && mapEvents.addEvent({
            eventRequest: {
                type: "fly-to-bounds",
                config: {
                    bounds: bounds,
                }
            }
        })
         
        console.log("featureInEdit: ", featureInEdit)
        console.log("bounds: ", bounds)
    }

    onUpdate = ({featureInEdit}) => {
        this.setState({ formInitialValues: {
            ...this.state.formInitialValues,
                geometry: featureInEdit.geometry,
                eligibleArea: featureInEdit.area,
                totalArea: featureInEdit.area,
        }})

        console.log("featureInEdit: ", featureInEdit)
    }

    render() {
        const { selectedParcel } = this.state
        const { parcels } = this.props

        const otherParcels = parcels.filter(x => selectedParcel? x.id != selectedParcel.id: true)

        console.log("parcels: ", parcels)
        console.log("otherParcels: ", otherParcels)
        console.log("selectedParcel: ", selectedParcel)
        const { formInitialValues = {}, isDrawing } = this.state
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
                        onClick={(e) => console.log("Map click: ", e)}
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
                                    action={createSeasonParcel}
                                    onCancel={this.onCancel}
                                    initialValues={{
                                        ...formInitialValues,
                                    }}
                                    //onSubmit={() => console.log("Form submit finished.")}
                                />
                                :
                                <AddParcelButton            
                                    onParcelAdd={this.onClick}
                                />
                            }
                        </MapUpperToolbar>
                        { parcels && parcels.map((parcel, i) => (
                            <Feature
                                key={i}
                                onClick={this.onSelect}
                                data={parcel}
                            />
                        )) }
                    </Map>
                </Grid>
            </Grid>
        ) 
    }
}

const withSagaCreate = injectSagas(require('parcel/sagas/createSeasonParcel'))
const withSagaList = injectSagas(require('parcel/sagas/listSeasonParcel'))

const withReducerParcels = injectReducer(require('parcel/reducers/parcels'))
const withReducerSoilTypes = injectReducer(require('reference/reducers/soilTypes'))
const withReducerParcelTypes = injectReducer(require('reference/reducers/parcelTypes'))

const withConnect = connect(
  (state) => ({parcels: selectSeasonParcelsList(state)}),
  (dispatch) => bindRoutineCreators({ mapEvents, listSeasonParcel }, dispatch),
)



export default compose(
    withSagaCreate,
    withSagaList,
    withReducerParcels,
    withReducerSoilTypes,
    withReducerParcelTypes,
    withConnect,
)(MapContainer)