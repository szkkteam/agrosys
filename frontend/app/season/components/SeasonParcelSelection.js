import React from 'react'
import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listSeasonParcel } from 'parcel/actions'
import { selectLastSeasonParcels } from 'parcel/reducers/parcels'
import { getSeasonParcelsById } from 'parcel/selectors'
import { selectLastSeason } from 'season/reducers/seasons'

import {
    ParcelList,
} from 'parcel/components'

class SeasonParcelSelection extends React.Component {
   
    constructor(props) {
        super(props)

        this.state = {
            seasonParcelsTree: props.seasonParcelsTree.map((parcel, i) => (
                Object.assign(parcel, { tableData: { checked: false } })
            ))
        }
    }
    

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.seasonParcelsTree.length && this.props.seasonParcelsTree.length) {
            this.setState({
                seasonParcelsTree: this.props.seasonParcelsTree.map((parcel, i) => (
                    Object.assign(parcel, { tableData: { checked: false } })
                ))
            })
        }
    }    
    
    componentDidMount() {
        const { listSeasonParcel, lastSeason } = this.props
        lastSeason && listSeasonParcel && listSeasonParcel.trigger({
            selectedSeason: lastSeason
        })
    }

    onSelection = (selections, row) => {
        const { seasonParcelsTree } = this.state
        const newData = !row? selections && selections.length? selections : seasonParcelsTree : seasonParcelsTree.map(parcel => {
                if ('parentParcelId' in row && row.parentParcelId == parcel.id) {
                    return {
                        ...parcel,
                        tableData: {
                            ...parcel.tableData,
                            checked: true,
                        }
                    }
                } else {
                    return {
                        ...parcel
                    }
                }
            })

        this.setState({ 
            seasonParcelsTree: newData
        }, () => {
            const { seasonParcelsTree } = this.state
            const { onSelection } = this.props
            onSelection && onSelection(
                seasonParcelsTree.filter(x => x.tableData.checked)
            )
        })
    }

    render() {
        const { onSelection, seasonParcelsTree, ...rest } = this.props
        const { seasonParcelsTree: parcels } = this.state
        return (
            <React.Fragment>
                { parcels && parcels.length && parcels[0]?  // FIXME: This is a quick workaround to prevent error, trigger last season-parcel read somewhere
                    <ParcelList
                        parcels={parcels}
                        parentChildData={(row, rows) => rows.find(a => a.id === row.parentParcelId)}
                        
                        components={{
                            Toolbar: props => null,
                            //Header: props => null, 
                        }}
                        {...rest}
                        onSelectionChange={this.onSelection}
                        options={{
                            selection: true,
                            showSelectAllCheckbox: true,
                            showTextRowsSelected: false,
                        }}
                    />
                : null }
            </React.Fragment>

            
        ) 
    }
}


const withSagaSeasons = injectSagas(require('season/sagas/seasons'))
const withSagaParcels = injectSagas(require('parcel/sagas/listSeasonParcel'))
const withReducerParcels = injectReducer(require('parcel/reducers/parcels'))
const withReducerSeasons = injectReducer(require('season/reducers/seasons'))
const withReducerSoilTypes = injectReducer(require('reference/reducers/soilTypes'))

const mapStateToProps = (state) => {
    const selector = getSeasonParcelsById(state) 
    const lastSeasonParcels = selectLastSeasonParcels(state)
    const lastSeason = selectLastSeason(state)
    const {data: seasonParcelsTree, ...rest } = selector(lastSeasonParcels) 
    return {
        seasonParcelsTree,
        lastSeason,
        ...rest,
    }
}   
    
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