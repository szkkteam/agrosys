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
} from 'parcel/selectors'

import {
    ParcelList,
} from 'parcel/components'

class ParcelListContainer extends React.Component {

    
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
        // Keep this log, because parcelTree is not updated at the first time
        console.log("seasonParcelsTree: ", seasonParcelsTree)
        return (
            <React.Fragment>
                { seasonParcelsTree && seasonParcelsTree.length && 
                <ParcelList
                    title="Parcels"   
                    parcels={seasonParcelsTree}
                    onRowClick={(e, d) => console.log("Event: ", e + " data: ", d)}
                    onRowClick={this.onSelect}
                    parentChildData={(row, rows) => rows.find(a => a.id === row.parentParcelId)}
                    options={{
                        rowStyle: rowData => ({
                            backgroundColor: (selectedParcel && selectedParcel.id === rowData.id) ? '#EEE' : '#FFF'
                        })
                    }}
                    components={{
                        Toolbar: props => null,
                    }}
                />
                // TODO: Render some loading animation here
                } 
            </React.Fragment>
        )
    }
}

const withSagaSeasons = injectSagas(require('season/sagas/seasons'))
const withSagaParcels = injectSagas(require('parcel/sagas/listSeasonParcel'))
const withReducerParcels = injectReducer(require('parcel/reducers/parcels'))
const withReducerSeasons = injectReducer(require('season/reducers/seasons'))
const withReducerSoilTypes = injectReducer(require('reference/reducers/soilTypes'))
const withReducerAgriculturalTypes = injectReducer(require('reference/reducers/agriculturalTypes'))


const mapStateToProps = (state) => (
    {   seasonParcelsTree: getSelectedSeasonParcelsTree(state),
        selectedParcel: getSelectedParcel(state), }
)


const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindRoutineCreators({ actionParcel, listSeasonParcel }, dispatch),
)


export default compose(
    withSagaParcels,
    withSagaSeasons,
    withReducerParcels,
    withReducerSeasons,
    withReducerSoilTypes,
    withReducerAgriculturalTypes,
    withConnect,
)(ParcelListContainer)