import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import HomeIcon from "@material-ui/icons/Home";

import { ROUTES } from 'routes'
import { SideBarItem } from 'components'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'
import { storage } from 'utils'

import { listFarms } from 'farm/actions'
import { selectFarmsList } from 'farm/reducers/farms'

var onClick = () => {
    
}
/*
export const FarmMenu = {
      name: "farm", 
      Icon: HomeIcon, 
      route: ROUTES.Farms,
      items: [
        { name: "statements", label: "Statements", onClick },
        { name: "reports", label: "Reports", onClick }
      ]    
}
*/

let defaultFarmMenu = {
  route: ROUTES.Farm,
  Icon: {
    src: HomeIcon,
    props: { className: "drawer-item-icon", fontSize: "default" }
  },
  label: 'Farm',
  items: [],
 }

const defaultFarmMenuSubItems = [{
  name: "new-item",
  label: "Create New",
  Icon: {
    src: HomeIcon,
    props: { className: "drawer-item-icon", fontSize: "default" }
  },
  route: ROUTES.FarmCreate,
  }]

class FarmMenu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      farmMenu: defaultFarmMenu
    }
  }

  componentWillMount() {
    this.props.listFarms.maybeTrigger()
  }

  getFarmMenu = (farms, subItems) => {
    const items = []
    farms.map(({id, title}) => {
      items.push({
        name: title,
        label: title,
        Icon: {
          src: HomeIcon,
          props: { className: "drawer-item-icon", fontSize: "default" }
        },
        //route: ROUTES.FarmDetail
      })

    })
    return items.concat(subItems)
  }

  render() {
    const { farms } = this.props
    // If only one farm exists, activate it
    if (farms.length == 1) {
      storage.activateFarm(farms[0])
    }
    const { farmMenu } = this.state;
    farmMenu.items = this.getFarmMenu(farms, defaultFarmMenuSubItems)
    return (
      <SideBarItem
        item={farmMenu}
        { ...this.props }
      />
    )
  }

 }

const withReducer = injectReducer(require('farm/reducers/farms'))
const withSaga = injectSagas(require('farm/sagas/farms'))

const withConnect = connect(
  (state) => ({ farms: selectFarmsList(state) }),
  (dispatch) => bindRoutineCreators({ listFarms }, dispatch),
)

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FarmMenu)