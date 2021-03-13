import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import NavigationContext from './NavigationContext'
import { NavRail } from 'components/NavRail'

import { ResourceRailItem } from 'farmApp/resource/menus'
import { OperationRailItem } from 'farmApp/operation/menus'
import { CropRailItem } from 'farmApp/cropProduction/menus'
import { PlanRailItem } from 'farmApp/plan/menus'
import { InventoryRailItem } from 'farmApp/resource/inventory/menus'
import { DashboardRailItem } from 'farmApp/dashboard/menus'
import { ReportRailItem } from 'farmApp/report/report/menus'

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const NavBar = ({

}) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up('navRailHide'));

  const [isDrawerOpen, setDrawer] = useState(false)

  const handleDrawerOpen = () => {
    setDrawer(true)
  }

  const handleDrawerClose = () => {
    setDrawer(false)
  }

  const contextObject = {
    isDrawerOpen,
    handleDrawerOpen,
    handleDrawerClose,
  }


  return (
      <NavigationContext.Provider
        value={contextObject}
      >
        { isTablet && <NavRail>
          <DashboardRailItem />   
          <OperationRailItem />

          <PlanRailItem />
          <InventoryRailItem disabled/>
          <ResourceRailItem />
          <ReportRailItem disabled/>    
        </NavRail> }
      </NavigationContext.Provider>      
  )
}

//          <CropRailItem />

const withConnect = connect(
  (state) => ({ isAuthenticated: state.security.isAuthenticated }),
)

export default compose(
  withConnect,
)(NavBar)
