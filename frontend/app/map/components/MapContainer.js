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
    ParcelGroup,
    ParcelSelected
} from 'map/components'

import {
    Map,
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
            selectedChildId: null,
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
        const { selectedParcelId, selectedChildId } = this.state
        const { parcels } = this.props

        const selectedParcel = parcels.find(x => x.id == selectedParcelId)
        if (selectedChildId) {
            const selectedChild = selectedParcel.parcels.find(x => x.id == selectedChildId)
            console.log("selectedChild: ", selectedChildId)
            this.draw.current.addPolygon(selectedChild.geometry)
            this.draw.current.toggleEdit(true)
    
            // Excluding some parts
            const correctedParcelData = { 
                id: selectedChild.id,
                geometry: selectedChild.geometry,
                title: selectedChild.title,
                notes: selectedChild.notes,
                eligibleArea: selectedChild.eligibleArea,
                totalArea: selectedChild.totalArea,
                referenceParcelTypeId: selectedChild.referenceParcelType.id,
                soilTypeId: selectedChild.soilType.id,
              }
    
            this.setState({
                status: mapStateEnum.EDIT,
                formInitialValues: {
                    ...correctedParcelData,
                }
            })

        } else if (selectedParcelId) {            

            console.log("selectedParcel: ", selectedParcelId)
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
    }

    onSelect = (parcel, e) => {
        console.log("On select: ", parcel)
        const { selectedParcelId } = this.state
        const isSameSelected =  (selectedParcelId && parcel.id == selectedParcelId)
        this.setState({ 
            selectedParcelId: (isSameSelected? null : parcel.id) ,
            selectedChildId: null,
        })
    }

    onSelectChild = (parcel, e) => {
        console.log("On select child: ", parcel)
        const { selectedChildId } = this.state
        this.setState({ 
            selectedChildId: (selectedChildId && parcel.id == selectedChildId? null : parcel.id) 
        })
    }

    onSelectEmpty = () => {
        if (this.state.status === mapStateEnum.IDLE) {
            this.setState({
                selectedParcelId: null,
                selectedChildId: null,
            })
        }            
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
        const { selectedParcelId, selectedChildId, formInitialValues = {}, status } = this.state
        const { selectedSeason, parcels } = this.props
        console.log("parcels: ", parcels)
        const selectedParcel = selectedParcelId? parcels.find(x => x.id == selectedParcelId) : null
        const selectedChild = selectedParcel? selectedParcel.parcels.find(x => x.id == selectedChildId) : null

        const otherParcels = parcels.filter(x => selectedParcelId? x.id != selectedParcelId: true)

        //console.log("selectChildParels: ", this.props.selectChildParels)
        //console.log("selectChildParels: ", this.props.selectChildParels(parcels.find(x => x.id == 13).parcels))
        console.log("selectedParcel: ", selectedParcel)
        //console.log("formInitialValues: ", formInitialValues)
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
                        onClick={this.onSelectEmpty}
                        editable={true}
                        overlay={
                            <ParcelGroup checked parcels={otherParcels} onClick={this.onSelect} />
                        }
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
                                    selectedParcel={selectedChild? selectedChild: selectedParcel}
                                    onAdd={this.onAdd}
                                    onEdit={this.onEdit}
                                />                            
                            }
                        </MapUpperToolbar>                    
                        { status === mapStateEnum.IDLE && <ParcelSelected
                            parcel={selectedParcel} onClick={this.onSelect}
                        /> }
                        {selectedParcel && this.props.selectChildParels(selectedParcel.parcels).map((p, i) => {
                            console.log("Child parcel: ", p)
                            return (
                                <ParcelSelected
                                    key={`${p.tite}-${i}`}
                                    color="green"
                                    parcel={p} onClick={this.onSelectChild}
                            />  
                            )
                        }

                        )}
                        { status === mapStateEnum.IDLE && <ParcelSelected color="red"
                            parcel={selectedChild} onClick={this.onSelectChild}
                        /> }
                        
                        
                    </Map>
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