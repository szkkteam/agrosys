import React from 'react'
import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listSeasons, actionSeason } from 'season/actions'
import { selectSeasonsList, selectSelectedSeasons } from 'season/reducers/seasons'

import {
    SeasonPopover,
    SeasonList,
    SeasonCreateContainer
} from 'season/components'

class SeasonSelector extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false,
        }
    }

    componentDidMount() {
        this.props.listSeasons && this.props.listSeasons.maybeTrigger()
    }

    openModal = () => this.setState({isModalOpen: true})
    closeModal = () => this.setState({isModalOpen: false})

    render() {
        const { seasons, selectedSeason, children, ...props } = this.props
        const { isModalOpen } = this.state
        return (
            <SeasonPopover
                label={selectedSeason.title}                
            >
                <SeasonCreateContainer
                    open={isModalOpen}
                    onClose={this.closeModal}
                />                 
                <SeasonList
                    seasons={seasons}
                    onAdd={this.openModal}
                />
            </SeasonPopover>
        )
    }
}


const withReducer = injectReducer(require('season/reducers/seasons'))
const withSaga = injectSagas(require('season/sagas/seasons'))

const withConnectSeasons = connect(
  (state) => ({
    seasons: selectSeasonsList(state),
    isAuthenticated: state.security.isAuthenticated,
    selectedSeason: selectSelectedSeasons(state)
   }),
  (dispatch) => bindRoutineCreators({ listSeasons, actionSeason }, dispatch),
)

export default compose(
  withReducer,
  withSaga,
  withConnectSeasons,
)(SeasonSelector)