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
        const { setSeason } = this.props
        setSeason && setSeason.maybeTrigger({
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


const withReducer = injectReducer(require('season/reducers/seasons'))
const withSagaList = injectSagas(require('season/sagas/seasons'))
const withSagaSet = injectSagas(require('season/sagas/setSeason'))

const withConnectSeasons = connect(
  (state) => ({
    seasons: selectSeasonsList(state),
    isAuthenticated: state.security.isAuthenticated,
    selectedSeason: selectSelectedSeasons(state)
   }),
  (dispatch) => bindRoutineCreators({ listSeasons, setSeason }, dispatch),
)

export default compose(
  withReducer,
  withSagaList,
  withSagaSet,
  withConnectSeasons,
)(SeasonContainer)