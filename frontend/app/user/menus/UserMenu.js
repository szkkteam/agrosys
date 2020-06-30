import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Avatar from '@material-ui/core/Avatar';
import HomeIcon from "@material-ui/icons/Home";

import { ROUTES } from 'routes'
import { SideBarItem } from 'components'
import { storage } from 'utils'

const defaultFarmMenu = [{ 
  label: "Test User",
  Icon: HomeIcon,
  //route: ROUTES.Farms,
 }];

 /*
             <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
  <SideBarItem
        item={item}
        { ...this.props }
      />
 */

class UserMenu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userMenu: defaultFarmMenu
    }
  }

  getUnauthenticatedMenuItem() {
    return {
      //route: ROUTES.Farm,
      Icon: {
        src: Avatar,
        props: { alt: "Anonymus", src: "/static/images/avatar/1.jpg" }
      },
      label: 'Login',
      route: ROUTES.Login,
    }
  }

  getAuthenticatedMenuItem() {
    const user = storage.getUser()
    return {
      //route: ROUTES.Farm,
      Icon: {
        src: Avatar,
        props: { alt: user.username, src: "/static/images/avatar/1.jpg" }
      },

      label: user.firstName + ' ' + user.lastName,
      items: [{
          label : "Logout",
          route: ROUTES.Logout,
        }],

    }
  }

  render() {
    const { isAuthenticated } = this.props
    const { userMenu } = this.state;    
    return (
        <SideBarItem
            item={
              isAuthenticated? 
                this.getAuthenticatedMenuItem() :
                this.getUnauthenticatedMenuItem()
            }
            { ...this.props }
        />

    )
  }

}

const withConnect = connect(
  (state) => ({ isAuthenticated: state.security.isAuthenticated }),
)

export default compose(
  //withRouter,
  withConnect,
)(UserMenu)