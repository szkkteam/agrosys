import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import classnames from 'classnames'

import { ROUTES } from 'routes'
import NavLink from './NavLink'
import NavBarContext from './NavBarContext'
import { AppBar } from 'components/AppBar'
import { SideBar } from 'components/SideBar'

import './navbar.scss'

/*
{ isAuthenticated? 
      <NavBarContext.Provider
        value={contextObject}
      >
        <AppBar
          isDrawerOpen={isDrawerOpen}
          onDrawerOpen={handleDrawerOpen}
        />
        <SideBar
          isDrawerOpen={isDrawerOpen}
          onDrawerClose={handleDrawerClose}
        />
      </NavBarContext.Provider>      
      : null }
*/

const NavBar = ({
  isAuthenticated,
}) => {

  const [isDrawerOpen, setDrawer] = useState(true)

  const contextObject = {
    isDrawerOpen,
    isAuthenticated
  }

  const handleDrawerOpen = () => {
    setDrawer(true)
  }

  const handleDrawerClose = () => {
    setDrawer(false)
  }

  return (
    <React.Fragment>
      { isAuthenticated? 
      <NavBarContext.Provider
        value={contextObject}
      >
        <AppBar
          isDrawerOpen={isDrawerOpen}
          onDrawerOpen={handleDrawerOpen}
        />
        <SideBar
          isDrawerOpen={isDrawerOpen}
          onDrawerClose={handleDrawerClose}
        />
      </NavBarContext.Provider>      
      : null }     
    </React.Fragment>
  )
}

const withConnect = connect(
  (state) => ({ isAuthenticated: state.security.isAuthenticated }),
)

export default compose(
  withRouter,  // required for NavLinks to determine whether they're active or not
  withConnect,
)(NavBar)
