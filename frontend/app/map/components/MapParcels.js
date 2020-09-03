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
    listParcelTypes,
} from 'reference/actions'

import { mapEvents } from 'components/Map/actions'
import {
    getSelectedParcel,
    getSelectedSeasonParcels,
    getSelectedSiblingParcels,
} from 'parcel/reducers/parcels'

import {
    ParcelGroup,
    ParcelSelected
} from 'map/components'

import {
    Map,
    Feature,
} from 'components/Map/components'


class MapParcels extends React.Component {

    
    componentDidMount() {
        const { listSeasonParcel, listSoilTypes, listParcelTypes } = this.props
        listSeasonParcel && listSeasonParcel.maybeTrigger()
        listSoilTypes && listSoilTypes.maybeTrigger()
        listParcelTypes && listParcelTypes.maybeTrigger()
    }


    onSelectEmpty = () => {
        const { preventEmptyClick, actionParcel } = this.props
        //console.log("isDrawing: ", isDrawing)
        !preventEmptyClick && actionParcel && actionParcel.selectParcel({selectedParcelId: null})         
    }

    onSelect = (parcel, i) => {
        console.log("Selecting: ", parcel)
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
                        parcels={seasonParcels}
                        onClick={this.onSelect}
                    />
                }
            >   
                <React.Fragment>     
                    { groupParcel && !hideSelection &&
                        // Render the active group parcel selection.
                        <ParcelSelected
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
                        <ParcelSelected
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
const withSagaParcelTypes = injectSagas(require('reference/sagas/listParcelTypes'))

const withReducerParcels = injectReducer(require('parcel/reducers/parcels'))
const withReducerSoilTypes = injectReducer(require('reference/reducers/soilTypes'))
const withReducerParcelTypes = injectReducer(require('reference/reducers/parcelTypes'))


const withConnect = connect(
  (state) => ({
      selectedParcel: getSelectedParcel(state),
      seasonParcels: getSelectedSeasonParcels(state),
      siblingParcels: getSelectedSiblingParcels(state),
    }),
    (dispatch) => bindRoutineCreators({ actionParcel, listSeasonParcel, listSoilTypes, listParcelTypes }, dispatch),
)


export default compose(
    withSagaParcels,
    withSagaSoilTypes,
    withSagaParcelTypes,
    withReducerParcels,
    withReducerSoilTypes,
    withReducerParcelTypes,
    withConnect,
)(MapParcels)