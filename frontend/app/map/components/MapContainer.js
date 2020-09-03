import React from 'react'
import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { 
    createParcel,
    updateParcel,
} from 'parcel/actions'

import { mapEvents } from 'components/Map/actions'
import {
    getSelectedParcel,


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
        }
        this.draw = React.createRef();
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
        const { selectedParcel } = this.props

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
    }

    render() {
        const { formInitialValues = {}, status } = this.state
        const { selectedSeason, selectedParcel } = this.props
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
                        preventEmptyClick={status != mapStateEnum.IDLE}
                        hideSelection={status == mapStateEnum.EDIT}
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
const withReducerParcels = injectReducer(require('parcel/reducers/parcels'))


const withConnect = connect(
  (state) => ({
      selectedParcel: getSelectedParcel(state),
      parcels: selectSeasonParcelsList(state),
      selectedSeason: selectSelectedSeasons(state),
      selectChildParels: (ids) => selectParcelsListById(state, ids)
    }),
  (dispatch) => bindRoutineCreators({ mapEvents }, dispatch),
)



export default compose(
    withSagaCreate,
    withSagaUpdate,
    withReducerParcels,
    withConnect,
)(MapContainer)