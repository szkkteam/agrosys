import React from 'react'
import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { 
    listSeasonParcel,
} from 'parcel/actions'

import {
    getLastSeasonParcelsTree,
} from 'parcel/selectors'

import {
    ParcelList,
} from 'parcel/components'

class SeasonParcelSelection extends React.Component {
   

    componentDidMount() {
        const { listSeasonParcel } = this.props
        listSeasonParcel && listSeasonParcel.maybeTrigger()
    }

    render() {
        const { seasonParcelsTree, ...rest } = this.props
        return (
            <ParcelList
                parcels={seasonParcelsTree.map((parcel, i) => (
                    Object.assign(parcel, { tableData: { checked: false } })
                ))}
                components={{
                    Toolbar: props => null,
                    //Header: props => null, 
                }}
                {...rest}
                options={{
                    selection: true,
                    showSelectAllCheckbox: true,
                    showTextRowsSelected: false,
                }}
            />
        ) 
    }
}


const withSagaSeasons = injectSagas(require('season/sagas/seasons'))
const withSagaParcels = injectSagas(require('parcel/sagas/listSeasonParcel'))
const withReducerParcels = injectReducer(require('parcel/reducers/parcels'))
const withReducerSeasons = injectReducer(require('season/reducers/seasons'))
const withReducerSoilTypes = injectReducer(require('reference/reducers/soilTypes'))

const mapStateToProps = (state) => (
    { seasonParcelsTree: getLastSeasonParcelsTree(state) }
)

const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindRoutineCreators({ listSeasonParcel }, dispatch),
)


export default compose(
    withSagaParcels,
    withSagaSeasons,
    withReducerParcels,
    withReducerSeasons,
    withReducerSoilTypes,
    withConnect,
)(SeasonParcelSelection)