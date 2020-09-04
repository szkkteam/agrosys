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
    getSelectedParcel,
    getSelectedSeasonParcelsTree,
    getSelectedSeasonParcels,
} from 'parcel/reducers/parcels'

import {
    ParcelList,
} from 'parcel/components'

class ParcelListController extends React.Component {

    
    componentDidMount() {
        const { listSeasonParcel } = this.props
        listSeasonParcel && listSeasonParcel.maybeTrigger()
    }

    onSelect = (e, row) => {
        //console.log("Row: ", row)
        const { actionParcel } = this.props
        actionParcel && actionParcel.selectParcel({
            selectedParcelId: row.id
        })
    }

    render() {
        const { seasonParcelsTree, selectedParcel } = this.props

        return (
            <ParcelList
                parcels={seasonParcelsTree}
                onRowClick={(e, d) => console.log("Event: ", e + " data: ", d)}
                onRowClick={this.onSelect}
                options={{
                    rowStyle: rowData => ({
                        backgroundColor: (selectedParcel && selectedParcel.id === rowData.id) ? '#EEE' : '#FFF'
                      })
                }}
            /> 
        )
    }
}


const withSagaParcels = injectSagas(require('parcel/sagas/listSeasonParcel'))
const withReducerParcels = injectReducer(require('parcel/reducers/parcels'))

const withConnect = connect(
  (state) => ({
      seasonParcelsTree: getSelectedSeasonParcelsTree(state),
      selectedParcel: getSelectedParcel(state),
    }),
    (dispatch) => bindRoutineCreators({ actionParcel, listSeasonParcel }, dispatch),
)


export default compose(
    withSagaParcels,
    withReducerParcels,
    withConnect,
)(ParcelListController)