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
} from 'parcel/selectors'
import { selectSelectedSeasons } from 'season/reducers/seasons'

import {
    Draw,
    MapUpperToolbar,
    AddEditToolbar,
    MapParcels,
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
                referenceParcelType: null,
            },
            //featureInEdit: null,
            status: mapStateEnum.IDLE,            
        }
        this.draw = React.createRef();
    }

    componentDidUpdate(prevProps) {        
        if ((prevProps.selectedParcel !== this.props.selectedParcel) && 
            this.state.status != mapStateEnum.IDLE) {            
            this.onCancel()
        }
        /*
        if ((
            (prevProps.selectedParcel == this.props.selectedParcel) ||
            (prevProps.selectedParcel.id) == (this.props.selectedParcel.id)) && 
            this.state.status != mapStateEnum.IDLE) {            
            this.onCancel()
        }*/
    }

    onAdd = (e, i) => {        
        //console.log(e,i)
        this.draw.current.drawPolygon()
        this.setState({ 
            status: mapStateEnum.ADD,
            formInitialValues: {
                ...this.state.formInitialValues,
                referenceParcelType: i.key,
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
            referenceParcelType: selectedParcel.referenceParcelType,
            agriculturalTypeId: selectedParcel.agriculturalType.id,
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
        mapEvents && mapEvents.add({
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
        ) 
    }
}

const withSagaCreate = injectSagas(require('parcel/sagas/createParcel'))
const withSagaUpdate = injectSagas(require('parcel/sagas/updateParcel'))

const withReducerSeasons = injectReducer(require('season/reducers/seasons'))
const withReducerParcels = injectReducer(require('parcel/reducers/parcels'))
const withReducerSoilTypes = injectReducer(require('reference/reducers/soilTypes'))
const withReducerAgriculturalTypes = injectReducer(require('reference/reducers/agriculturalTypes'))

const mapStateToProps = (state) => ({
    selectedParcel: getSelectedParcel(state),
    selectedSeason: selectSelectedSeasons(state),
  })

const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindRoutineCreators({ mapEvents }, dispatch),
)



export default compose(
    withSagaCreate,
    withSagaUpdate,
    withReducerParcels,
    withReducerSoilTypes,
    withReducerAgriculturalTypes,
    withReducerSeasons,
    withConnect,
)(MapContainer)