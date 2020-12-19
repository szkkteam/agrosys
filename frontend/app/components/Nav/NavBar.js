import React, { useState } from 'react'
import messages from './messages';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { ROUTES } from 'routes'
import NavLink from './NavLink'

import NavBarContext from './NavBarContext'
import { AppBar } from 'components/AppBar'
//import { SideBar } from 'components/SideBar'
import { NavRail } from 'components/NavRail'
//import { NestedMenuItem } from 'components'

import { ResourceRailItem } from 'resource/resource/menus'
import { ProductionRailItem } from 'production/production/menus'
//import { BlockMenuItem } from 'farmApp/block/menus'
//import { EntityMenuItem } from 'farmApp/entity/menus'
//import { WorkerMenuItem } from 'farmApp/worker/menus'
//import { MachineryMenuItem } from 'farmApp/machinery/menus'
//import { StorageMenuItem } from 'farmApp/storage/menus'
import { DashboardMenuItem, DashboardRailItem } from 'farmApp/dashboard/menus'

//import { SaleMenuItem } from 'farmApp/sale/menus'
//import { ExpenseMenuItem } from 'farmApp/expense/menus'
//import { BudgetMenuItem } from 'farmApp/budget/menus'
//import { LoanMenuItem } from 'farmApp/loan/menus'
//import { TransactionMenuItem } from 'farmApp/transaction/menus'
//import { ReportMenuItem } from 'farmApp/report/menus'
//import { ItemMenuItem } from 'farmApp/item/menus'
//import { PlanMenuItem } from 'farmApp/plan/menus'
//import { InventoryMenuItem } from 'farmApp/inventory/menus'
//import { TraceabilityMenuItem } from 'farmApp/traceability/menus'



const NavBar = ({
  pageTitle,
  appBarRef,
  appTabRef,
  isAuthenticated,
}) => {

  const [isDrawerOpen, setDrawer] = useState(false)

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
          ref={appBarRef}
          appTabRef={appTabRef}
          title={pageTitle}
          isDrawerOpen={isDrawerOpen}
          onDrawerOpen={handleDrawerOpen}
        />
        
        
        <NavRail>
          <DashboardRailItem />       
          <ResourceRailItem />
          <ProductionRailItem />
        </NavRail>
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

/*
<SideBar
    isDrawerOpen={isDrawerOpen}
    onDrawerClose={handleDrawerClose}
  >
    <DashboardMenuItem />
    <ReportMenuItem />
    <NestedMenuItem
      IconComponent={EuroIcon}
      title={messages.financesTitle}
    >
      <SaleMenuItem />
      <ExpenseMenuItem />
      <Divider />
      <BudgetMenuItem />
      <LoanMenuItem />
      <Divider />
      <TransactionMenuItem />
    </NestedMenuItem>
    <NestedMenuItem
      IconComponent={InboxIcon}
      title={messages.resourcesTitle}
    >
      <BlockMenuItem />
      <Divider />
      <WorkerMenuItem />
      <MachineryMenuItem />
      <Divider />
      <EntityMenuItem />
    </NestedMenuItem>
    <NestedMenuItem
      IconComponent={AppsIcon}
      title={messages.plannerTitle}
    >
      <ItemMenuItem />
      <PlanMenuItem />
    </NestedMenuItem>
    <InventoryMenuItem />
    <TraceabilityMenuItem />

  </SideBar>  
*/