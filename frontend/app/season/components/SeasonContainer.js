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

class SeasonContainer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false,
        }
        //this.popover = React.createRef();
    }

    componentDidMount() {
        this.props.listSeasons && this.props.listSeasons.maybeTrigger()
    }

    openModal = () => this.setState({isModalOpen: true})
    closeModal = () => {
        console.log("closeModal -> Closing")
        this.setState({isModalOpen: false})
    }

    
    onSelect = (e, row) => {
        //console.log("Row: ", row)
        const { actionSeason } = this.props
        actionSeason && actionSeason.setSeason({
            selectedSeasonId: row.id
        })
        //this.popover.handleClose()
    }

    render() {
        const { seasons, selectedSeason, children, ...props } = this.props
        const { isModalOpen } = this.state
        return (
            <SeasonPopover
                //ref={this.popover}
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
)(SeasonContainer)