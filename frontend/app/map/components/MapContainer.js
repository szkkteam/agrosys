import React from 'react'
import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { 
    createParcel,
    listSeasonParcel,
    updateParcel,
} from 'parcel/actions'

import {
    listSoilTypes,
    listParcelTypes,
} from 'reference/actions'

import { mapEvents } from 'components/Map/actions'
import {
    selectSeasonParcelsList,
    selectParcelsListById,
} from 'parcel/reducers/parcels'
import { selectSelectedSeasons } from 'season/reducers/seasons'

import Grid from '@material-ui/core/Grid';

import {
    SeasonSelector
} from 'season/components'

import {
    MapUpperToolbar,
    AddEditToolbar,
    MapParcels,
    ParcelSelected
} from 'map/components'

import {
    Draw,
} from 'components/Map/components'

import {
    FormParcel,
} from 'parcel/components'

const mapStateEnum = {
    ADD: 'ADD',
    EDIT: 'EDIT',
    IDLE: 'IDLE',
}

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
            status: mapStateEnum.IDLE,            
            selectedParcelId: null,
        }
        this.draw = React.createRef();
    }

    componentDidMount() {
        const { listSeasonParcel, listSoilTypes, listParcelTypes } = this.props
        listSeasonParcel && listSeasonParcel.maybeTrigger()
        listSoilTypes && listSoilTypes.maybeTrigger()
        listParcelTypes && listParcelTypes.maybeTrigger()
    }

    onAdd = (e, i) => {        
        //console.log(e,i)
        this.draw.current.drawPolygon()
        this.setState({ 
            status: mapStateEnum.ADD,
            formInitialValues: {
                ...this.state.formInitialValues,
                referenceParcelTypeId: i.data.id,
            }
        })

    }

    onEdit = () => {
        const { selectedParcelId } = this.state
        const { selectChildParels } = this.props

        const selectedParcel = selectedParcelId? selectChildParels([selectedParcelId])[0]: null
        console.log("selectedParcel: ", selectedParcelId)
        console.log("selectedParcel: ", selectedParcel)


        this.draw.current.addPolygon(selectedParcel.geometry)
        this.draw.current.toggleEdit(true)

        // Excluding some parts
        const correctedParcelData = { 
            id: selectedParcel.id,
            geometry: selectedParcel.geometry,
            title: selectedParcel.title,
            notes: selectedParcel.notes,
            eligibleArea: selectedParcel.eligibleArea,
            totalArea: selectedParcel.totalArea,
            referenceParcelTypeId: selectedParcel.referenceParcelType.id,
            soilTypeId: selectedParcel.soilType.id,
            }

        this.setState({
            status: mapStateEnum.EDIT,
            formInitialValues: {
                ...correctedParcelData,
            }
        })
    }

    onSelect = (selectedParcelId) => {
        this.setState({ 
            selectedParcelId
        })
    }

    onCancel = () => {
        this.draw.current.stopDraw()
        this.setState({ 
                status: mapStateEnum.IDLE,
                formInitialValues: {
                    geometry: null,
                    eligibleArea: 0,
                    totalArea: 0,
                },
            })
    }

    onFinished = ({featureInEdit, bounds}) => {
        this.setState({ formInitialValues: {
            ...this.state.formInitialValues,
                geometry: featureInEdit.geometry,
                eligibleArea: featureInEdit.area,
                totalArea: featureInEdit.area,
        }})
        // Force the map bounds to the new geometry
        this.toBounds(bounds)
         
        //console.log("featureInEdit: ", featureInEdit)
        //console.log("bounds: ", bounds)
    }

    toBounds = (bounds) => {
        const { mapEvents } = this.props
        mapEvents && mapEvents.addEvent({
            eventRequest: {
                type: "fly-to-bounds",
                config: {
                    bounds: bounds,
                }
            }
        })
    }

    onFeatureAdded = ({layer, bounds}) => {
        this.toBounds(bounds)
    }

    onUpdate = ({featureInEdit}) => {
        this.setState({ formInitialValues: {
            ...this.state.formInitialValues,
                geometry: featureInEdit.geometry,
                eligibleArea: featureInEdit.area,
                totalArea: featureInEdit.area,
        }})

        //console.log("featureInEdit: ", featureInEdit)
    }

    render() {
        const { selectedParcelId, formInitialValues = {}, status } = this.state
        const { selectedSeason, selectChildParels } = this.props
        
        const selectedParcel = selectedParcelId? selectChildParels([selectedParcelId])[0]: null
        console.log("selectedParcel: ", selectedParcel)
        //console.log("parcels: ", parcels)
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
                    <MapParcels
                        isDrawing={status != mapStateEnum.IDLE}
                        onSelect={this.onSelect}
                    >   
                        <Draw
                            ref={this.draw}
                            onUpdate={this.onUpdate}
                            onFinished={this.onFinished}
                            onFeatureAdded={this.onFeatureAdded}
                        />
                        <MapUpperToolbar>
                            { status != mapStateEnum.IDLE? 
                                <FormParcel
                                    action={ status === mapStateEnum.ADD? createParcel : updateParcel}
                                    onCancel={this.onCancel}
                                    onSubmitSuccess={this.onCancel}
                                    initialValues={{
                                        ...formInitialValues,
                                        parentSeason: selectedSeason,
                                        parentParcel: selectedParcel,
                                    }}
                                />
                                :
                                <AddEditToolbar
                                    selectedParcel={selectedParcel}
                                    onAdd={this.onAdd}
                                    onEdit={this.onEdit}
                                />                            
                            }
                        </MapUpperToolbar> 
                    </MapParcels>                    
                </Grid>
            </Grid>
        ) 
    }
}

const withSagaCreate = injectSagas(require('parcel/sagas/createParcel'))
const withSagaUpdate = injectSagas(require('parcel/sagas/updateParcel'))
const withSagaList = injectSagas(require('parcel/sagas/listSeasonParcel'))
const withSagaSoilTypes = injectSagas(require('reference/sagas/listSoilsTypes'))
const withSagaParcelTypes = injectSagas(require('reference/sagas/listParcelTypes'))

const withReducerParcels = injectReducer(require('parcel/reducers/parcels'))
const withReducerSoilTypes = injectReducer(require('reference/reducers/soilTypes'))
const withReducerParcelTypes = injectReducer(require('reference/reducers/parcelTypes'))

const withConnect = connect(
  (state) => ({
      parcels: selectSeasonParcelsList(state),
      selectedSeason: selectSelectedSeasons(state),
      selectChildParels: (ids) => selectParcelsListById(state, ids)
    }),
  (dispatch) => bindRoutineCreators({ mapEvents, listSeasonParcel, listSoilTypes, listParcelTypes }, dispatch),
)



export default compose(
    withSagaCreate,
    withSagaUpdate,
    withSagaList,
    withSagaSoilTypes,
    withSagaParcelTypes,
    withReducerParcels,
    withReducerSoilTypes,
    withReducerParcelTypes,
    withConnect,
)(MapContainer)