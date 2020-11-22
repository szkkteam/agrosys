import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import HomeIcon from "@material-ui/icons/Home";

import { ROUTES } from 'routes'
import { SideBarItem } from 'components'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { getFarmListOld } from 'farm/selectors'
import { listFarms } from 'farm/actions'
import { WithFarm } from 'farm/components'

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

const withReducerStatus = injectReducer(require('farm/reducers/farmStatus'))
const withReducerDetail = injectReducer(require('farm/reducers/farmDetail'))
const withSaga = injectSagas(require('farm/sagas/listFarms'))

const enchancer = [withReducerStatus, withReducerDetail, withSaga]

const mapStateToProps = (state) => {
  const { data: farmsMenuList, ...rest } = getFarmListOld(state)
  return {
    farmsMenuList,
    isAuthenticated: state.security.isAuthenticated,
    ...rest,
  }
}


const withConnect = connect(
  mapStateToProps,
  (dispatch) => bindRoutineCreators({ listFarms }, dispatch),
)

export default compose(
  //withReducerStatus,
  //withReducerDetail,
  //withSaga,
  ...enchancer,
  withConnect,
)(FarmMenu)