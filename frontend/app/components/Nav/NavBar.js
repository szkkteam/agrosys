import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { ROUTES } from 'routes'
import NavLink from './NavLink'
import NavBarContext from './NavBarContext'
import { AppBar } from 'components/AppBar'
import { SideBar } from 'components/SideBar'

import { BlockMenuItem } from 'farmApp/block/menus'
import { ResourceMenuItem } from 'farmApp/resource/menus'

import './navbar.scss'



const NavBar = ({
  isAuthenticated,
}) => {

  const [isDrawerOpen, setDrawer] = useState(true)

  const handleDrawerOpen = () => {
    setDrawer(true)
  }

  const handleDrawerClose = () => {
    setDrawer(false)
  }

  const contextObject = {
    isDrawerOpen,
    isAuthenticated,
    handleDrawerOpen,
    handleDrawerClose,
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
        >
          <ResourceMenuItem
            openDrawer={handleDrawerOpen}
            closeDrawer={handleDrawerClose}
          >
            <BlockMenuItem />
          </ResourceMenuItem>
        </SideBar>
      </NavBarContext.Provider>      
      : null }     
    </React.Fragment>
  )
}

const withConnect = connect(
  (state) => ({ isAuthenticated: state.security.isAuthenticated }),
)

export default compose(
  withConnect,
)(NavBar)
