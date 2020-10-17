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

  componentDidMount() {
    const { isAuthenticated } = this.props
    isAuthenticated && this.props.listFarms.maybeTrigger()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isAuthenticated != this.props.isAuthenticated && this.props.isAuthenticated) {
      this.props.listFarms.maybeTrigger()
    }
  }

  getFarmMenu = (menuList, subItems) => {
    const items = []
    menuList.map(({id, title}) => {
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
    const { farmsMenuList, isAuthenticated } = this.props
    const { farmMenu } = this.state;
    farmMenu.items = this.getFarmMenu(farmsMenuList, defaultFarmMenuSubItems)
    return (
      <div>
      { isAuthenticated &&
        <SideBarItem
          item={farmMenu}
          { ...this.props }
        />
      }
      </div>
    )
  }

 }

const withReducer = injectReducer(require('farm/reducers/farms'))
const withSaga = injectSagas(require('farm/sagas/farms'))

const withConnectFarms = connect(
  (state) => ({ farmsMenuList: [] }),
  (dispatch) => bindRoutineCreators({ listFarms }, dispatch),
)

const withConnectSecurity = connect(
  (state) => ({ isAuthenticated: state.security.isAuthenticated }),
)

export default compose(
  withReducer,
  withSaga,
  withConnectFarms,
  withConnectSecurity,
)(FarmMenu)