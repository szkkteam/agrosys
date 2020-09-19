import React from 'react'
import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { Spinner } from 'components/Loading'

import { 
    listSeasonParcel,
    actionParcel,
} from 'parcel/actions'

import {
    getSelectedParcel,
    getSelectedSeasonParcels,
} from 'parcel/selectors'

import {
    ParcelList,
    EmptyParcelList
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
        const { seasonParcelsTree, selectedParcel, isLoading } = this.props
        console.log("ParcelListContainer-isLoading: ", isLoading + " number of parcels: ", seasonParcelsTree.length)
        return (
            <React.Fragment>
                {
                    isLoading?
                        <Spinner />
                    :
                    !seasonParcelsTree.length? 
                        <EmptyParcelList />
                    :
                    <ParcelList
                        title="Parcels"   
                        parcels={seasonParcelsTree}
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


const mapStateToProps = (state) => {
    const { data: seasonParcelsTree, ...rest } = getSelectedSeasonParcels(state)
    return {
        seasonParcelsTree,
        selectedParcel: getSelectedParcel(state),
        ...rest,
    }
}

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