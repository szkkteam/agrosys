import React from 'react'
import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import HomeIcon from "@material-ui/icons/Home";

import { ROUTES } from 'routes'
import { SideBarItem } from 'components'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listSeasons, actionSeason } from 'season/actions'
import { selectSeasonsList } from 'season/reducers/seasons'

var onClick = () => {
    
}

let defaultMainMenu = {
  //route: ROUTES.Farm,
  Icon: {
    src: HomeIcon,
    props: { className: "drawer-item-icon", fontSize: "default" }
  },
  label: 'Seasons',
  items: [],
}

const defaultMenuSubItem = [{
  name: "new-item",
  label: "Create New",
  Icon: {
    src: HomeIcon,
    props: { className: "drawer-item-icon", fontSize: "default" }
  },
  //route: ROUTES.FarmCreate,
}]

class SeasonMenu extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    const { isAuthenticated } = this.props
    isAuthenticated && this.props.listSeasons.maybeTrigger()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isAuthenticated != this.props.isAuthenticated && this.props.isAuthenticated) {
      this.props.listSeasons.maybeTrigger()
    }
  }

  convertToMenu = (seasons) => (
    Array.isArray(seasons) && seasons.map((season, idx) => (
        {
            name: season.title,
            label: season.title,
            Icon: {
                src: HomeIcon,
                props: { className: "drawer-item-icon", fontSize: "default" }
            },
            onClick: () => { 
              console.log("Clicked on: ", season.id) 
              this.props.actionSeason.set({selected: season})
            } ,     
            labelProps: { style: {backgroundColor: "lightgray", padding: "5px", borderRadius: "20px", width: "70%"}, }      
        }
    ))
  )

  render() {
    const { seasons, isAuthenticated } = this.props
    const menuSubItems = defaultMenuSubItem.concat(this.convertToMenu(seasons))
    let meuItems = defaultMainMenu
    meuItems.items = menuSubItems
    console.log("Props: ", this.props)
    return (
      <div>
      { isAuthenticated &&
        <SideBarItem
          item={meuItems}
          { ...this.props }
        />
      }
      </div>
    )
  }

 }

const withReducer = injectReducer(require('season/reducers/seasons'))
const withSaga = injectSagas(require('season/sagas/seasons'))

const withConnectSeasons = connect(
  (state) => ({ seasons: selectSeasonsList(state), isAuthenticated: state.security.isAuthenticated }),
  (dispatch) => bindRoutineCreators({ listSeasons, actionSeason }, dispatch),
)

export default compose(
  withReducer,
  withSaga,
  withConnectSeasons,
)(SeasonMenu)