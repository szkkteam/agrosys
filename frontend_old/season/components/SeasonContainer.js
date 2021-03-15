import React from 'react'
import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listSeasons, setSeason } from 'season/actions'
import { selectSeasonsList, selectSelectedSeasons } from 'season/reducers/seasons'

import {
    SeasonPopover,
    SeasonList,
    SeasonCreateContainer
} from 'season/components'

class SeasonContainer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false,
        }
    }

    componentDidMount() {
        this.props.listSeasons && this.props.listSeasons.maybeTrigger()
    }

    componentDidUpdate(prevProps) {
        console.log("Seasons same? ", prevProps.seasons === this.props.seasons)
    }

    openModal = () => this.setState({isModalOpen: true})
    closeModal = () => {
        console.log("closeModal -> Closing")
        this.setState({isModalOpen: false})
    }

    
    onSelect = (e, row) => {
        //console.log("Row: ", row)
        const { setSeason } = this.props
        setSeason && setSeason.maybeTrigger({
            selectedSeasonId: row.id
        })
    }

    render() {
        const { seasons, selectedSeason, children, ...props } = this.props
        const { isModalOpen } = this.state

        console.log("SeasonContainer-seasons: ", seasons)
        return (
            <SeasonPopover
                label={selectedSeason? selectedSeason.title: "Select a Season!"}               
            >
                <SeasonCreateContainer
                    open={isModalOpen}
                    onClose={this.closeModal}
                />                 
                <SeasonList
                    seasons={seasons}
                    onRowClick={this.onSelect}
                    onAdd={this.openModal}
                    options={{
                        rowStyle: rowData => ({
                            backgroundColor: (selectedSeason && selectedSeason.id === rowData.id) ? '#EEE' : '#FFF'
                          })
                    }}
                />
            </SeasonPopover> 
        )
    }
}


const withReducerParcels = injectReducer(require('parcel/reducers/parcels'))
const withReducerSeasons = injectReducer(require('season/reducers/seasons'))
const withReducerSoilTypes = injectReducer(require('reference/reducers/soilTypes'))
const withReducerAgriculturalTypes = injectReducer(require('reference/reducers/agriculturalTypes'))
const withSagaList = injectSagas(require('season/sagas/listSeasons'))
const withSagaSet = injectSagas(require('season/sagas/setSeason'))




const mapStateToProps = (state) => {
    //const { data: seasons, ...rest } = getSeasonsDenormalized(state)
    return {
        seasons: [],
        selectedSeason: null,
        isAuthenticated: state.security.isAuthenticated,
        //...rest,
    }
}

const withConnectSeasons = connect(
    mapStateToProps,
    (dispatch) => bindRoutineCreators({ listSeasons, setSeason }, dispatch),
)

export default compose(
    withReducerParcels,
    withReducerSeasons,
    withReducerSoilTypes,
    withReducerAgriculturalTypes,
    withSagaList,
    withSagaSet,
    withConnectSeasons,
)(SeasonContainer)