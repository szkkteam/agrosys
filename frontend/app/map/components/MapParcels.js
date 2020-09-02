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



class MapParcels extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedGroupParcelId: null,
            selectedChildParelId: null,
        }
    }

    onSelectEmpty = () => {
        const { isDrawing, onSelect } = this.props
        //console.log("isDrawing: ", isDrawing)
        if (!isDrawing) {
            this.setState({
                selectedGroupParcelId: null,
                selectedChildParelId: null,
            })
            onSelect && onSelect(null)
        } 
    }

    onSelectGroup = (parcel, e) => {
        const { onSelect } = this.props
        const { selectedGroupParcelId } = this.state
        const isSameSelected =  (selectedGroupParcelId && parcel.id == selectedGroupParcelId)
        this.setState({ 
            selectedGroupParcelId: (isSameSelected? null : parcel.id) ,
            selectedChildId: null,
        })
        onSelect && onSelect((isSameSelected? null : parcel.id))
    }

    onSelectChild = (parcel, e) => {
        const { onSelect } = this.props
        const { selectedChildParelId, selectedGroupParcelId } = this.state
        const isSameSelected =  (selectedChildParelId && parcel.id == selectedChildParelId)
        this.setState({ 
            selectedChildParelId: (isSameSelected? null : parcel.id) ,
        })
        onSelect && onSelect((isSameSelected? selectedGroupParcelId : parcel.id))
    }


    render() {
        const { children, selectChildParels, parcels } = this.props
        const { selectedGroupParcelId, selectedChildParelId } = this.state

        const selectedGroupParcel = parcels.find(x => x.id == selectedGroupParcelId)
        //console.log("selectedGroupParcel: ", selectedGroupParcel)
        return (
            <Map
                onClick={this.onSelectEmpty}
                editable={true}
                overlay={
                    <ParcelGroup
                        checked
                        selectedParcel={selectedGroupParcelId}
                        selectedParcelStyle={{color: "white"}}
                        parcelStyle={{color: "lightblue"}}
                        parcels={parcels}
                        onClick={this.onSelectGroup}
                    />
                }
            >
                <React.Fragment>
                    {selectedGroupParcelId && selectChildParels(selectedGroupParcel.parcels).map((p, i) => {
                        console.log("Child parcel: ", p)
                        return (
                            <ParcelSelected
                                key={`${p.tite}-${i}`}
                                color={ selectedChildParelId == p.id? "red": "green" }
                                parcel={p} onClick={this.onSelectChild}
                        />  
                        )
                    }
                    )}                    
                    {children}
                </React.Fragment>                
            </Map>
        )
    }
}


const withSaga = injectSagas(require('parcel/sagas/listSeasonParcel'))
const withReducer = injectReducer(require('parcel/reducers/parcels'))

const withConnect = connect(
  (state) => ({
      parcels: selectSeasonParcelsList(state),
      selectChildParels: (ids) => selectParcelsListById(state, ids)
    }),
  null,
)



export default compose(
    withSaga,
    withReducer,
    withConnect,
)(MapParcels)