import React from 'react'
import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { 
    listSeasonParcel,
    actionParcel,
} from 'parcel/actions'

import {
    listSoilTypes,
    listAgriculturalTypes,
} from 'reference/actions'

import { mapEvents } from 'components/Map/actions'
import {
    getSelectedParcel,
    getSelectedSeasonParcelsGrouped,
    getSelectedSiblingParcels,
} from 'parcel/selectors'

import {
    Map,
    Feature,
    ParcelGroup,
} from 'components/Map/components'


class MapParcels extends React.Component {

    
    componentDidMount() {
        const { listSeasonParcel, listSoilTypes, listAgriculturalTypes } = this.props
        listSeasonParcel && listSeasonParcel.maybeTrigger()
        listSoilTypes && listSoilTypes.maybeTrigger()
        listAgriculturalTypes && listAgriculturalTypes.maybeTrigger()
    }

    onSelectEmpty = () => {
        const { preventEmptyClick, actionParcel } = this.props
        //console.log("isDrawing: ", isDrawing)
        !preventEmptyClick && actionParcel && actionParcel.selectParcel({selectedParcelId: null})         
    }

    onSelect = (parcel, i) => {
        //console.log("Selecting: ", parcel)
        const { actionParcel } = this.props
        actionParcel && actionParcel.selectParcel({
            selectedParcelId: parcel.id
        })
    }


    render() {
        const { children, selectedParcel, seasonParcels, siblingParcels, hideSelection } = this.props
        // Select the children parcels, take either the siblings or directly the nested parcel object
        const childParcels = selectedParcel && selectedParcel.parcels && selectedParcel.parcels.length? selectedParcel.parcels : siblingParcels
        // Select the group parcel if the selected parcel has sub parcels, otherwise null
        const groupParcel = selectedParcel && selectedParcel.parcels && selectedParcel.parcels.length? selectedParcel: null
        // Select the children parcel if the selected parcel does not have subparcels, otherwise null
        const childParcel = selectedParcel && !(selectedParcel.parcels && selectedParcel.parcels.length)? selectedParcel: null

        //console.log("childParcel: ", childParcel)
        //console.log("siblingParcels: ", siblingParcels)
        //console.log("childParcels: ", childParcels)
        //console.log("groupParcel: ", groupParcel)
        //console.log("childParcel: ", childParcel)
        return (
            <Map
                onClick={this.onSelectEmpty}
                editable={true}
                overlay={
                    <ParcelGroup
                        checked
                        parcelsGrouped={seasonParcels}
                        onClick={this.onSelect}
                    />
                }
            >   
                <React.Fragment>     
                    { groupParcel && !hideSelection &&
                        // Render the active group parcel selection.
                        <Feature
                            color="white"
                            onClick={this.onSelect}
                            data={groupParcel}  
                        />
                    }        
                    { // Render child parcels.
                        childParcels && childParcels.map((parcel, i) => {
                            return (
                                <Feature
                                    key={`${parcel.tite}-${i}`}
                                    //color="yellow" 
                                    data={parcel}
                                    onClick={this.onSelect}
                                />  
                            )
                        })
                    }
                    { childParcel && !hideSelection &&
                        // Render the active child parcel selection.
                        <Feature
                            color="white"
                            onClick={this.onSelect}
                            data={childParcel}  
                        />
                    }        
                    {children}
                </React.Fragment>                
            </Map>
        )
    }
}



const withSagaParcels = injectSagas(require('parcel/sagas/listSeasonParcel'))
const withSagaSoilTypes = injectSagas(require('reference/sagas/listSoilsTypes'))
const withSagaAgriculturalTypes = injectSagas(require('reference/sagas/listAgriculturalTypes'))

const withReducerParcels = injectReducer(require('parcel/reducers/parcels'))
const withReducerSoilTypes = injectReducer(require('reference/reducers/soilTypes'))
const withReducerAgriculturalTypes = injectReducer(require('reference/reducers/agriculturalTypes'))


const mapStateToProps = (state) => {
    const selectedParcel = getSelectedParcel(state)
    const { data: seasonParcels, ...rest} = getSelectedSeasonParcelsGrouped(state) 
    const { data: siblingParcels } = getSelectedSiblingParcels(state)
    return {
        selectedParcel,
        seasonParcels,
        siblingParcels,
        ...rest,
    }
}


const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindRoutineCreators({ actionParcel, listSeasonParcel, listSoilTypes, listAgriculturalTypes }, dispatch),
)


export default compose(
    withSagaParcels,
    withSagaSoilTypes,
    withSagaAgriculturalTypes,
    withReducerParcels,
    withReducerSoilTypes,
    withReducerAgriculturalTypes,
    withConnect,
)(MapParcels)