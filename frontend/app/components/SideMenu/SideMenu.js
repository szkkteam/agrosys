import React from 'react'
import classnames from 'classnames'
import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import SettingsIcon from "@material-ui/icons/Settings";

import Divider from '@material-ui/core/Divider';

import { ROUTES } from 'routes'
import SideBar from './SideBar'

import { FarmMenu } from 'farm/menus'
import { SeasonMenu } from 'season/menus'
import { MapMenu } from 'map/menus'

import { FieldMenu } from 'field/menus'
import { UserMenu } from 'user/menus'
import { ProductionMenu } from 'production/menus'

import './sidemenu.scss'

function onClick(e, item) {
    window.alert(JSON.stringify(item, null, 2));
  }
/*
const items = [
    { name: "home", label: "Home", Icon: HomeIcon, route: ROUTES.Farms },
    {
      name: "billing",
      label: "Billing",
      Icon: ReceiptIcon,
      items: [
        { name: "statements", label: "Statements", onClick },
        { name: "reports", label: "Reports", onClick }
      ]
    },
    "divider",
    {
      name: "settings",
      label: "Settings",
      Icon: SettingsIcon,
      items: [
        { name: "profile", label: "Profile" },
        { name: "insurance", label: "Insurance", onClick },
        "divider",
        {
          name: "notifications",
          label: "Notifications",
          Icon: NotificationsIcon,
          items: [
            { name: "email", label: "Email", onClick },
            {
              name: "desktop",
              label: "Desktop",
              Icon: DesktopWindowsIcon,
              items: [
                { name: "schedule", label: "Schedule" },
                { name: "frequency", label: "Frequency" }
              ]
            },
            { name: "sms", label: "SMS" }
          ]
        }
      ]
    }
  ];
*/
    /*
const items = [
    FarmMenu,    

    { 
      name: "field", 
      Icon: HomeIcon, 
      route: ROUTES.FieldList,
    },
    {
      name: "contact",
      Icon: ReceiptIcon,
      route: ROUTES.Contact,
    },
    {
      name: "home",
      Icon: ReceiptIcon,
      route: ROUTES.Home,
    },

  ];
      */


let items = [
  {
    src: UserMenu,
    type: "userMenu"
  },
  {
    src: Divider,
    type: "divider",
  },
  {
    src: FarmMenu,
    type: "menuItem"
  },
  {
    src: SeasonMenu,
    type: "menuItem",
  },
  {
    src: MapMenu,
    type: "menuItem",
  },
  {
    src: FieldMenu,
    type: "menuItem",
  },
  {
    src: ProductionMenu,
    type: "menuItem"
  },    
]


export default class SideMenu extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        menuOpen: true,
      }
    }


    handleToggleMenu = () => {
        this.setState({ menuOpen: !this.state.menuOpen })
    }

    render() {
        const isOpen = this.state.menuOpen;        

        return (
              <Drawer className={classnames({
                  'side-navigation': true,
                  'drawer-open': isOpen ,
                  'drawer-close': !isOpen ,
              })}
                  variant="permanent"
                  classes={{
                      paper: clsx({
                        ['drawer-open']: isOpen,
                        ['drawer-close']: !isOpen,
                      }),
                    }}
              >
                  <div>
                      { isOpen? this.renderCloseButton() : this.renderOpenButton() } 
                  </div>
                  <Divider/>
                  <SideBar items={items} />
              </Drawer>
        )
    }

    renderCloseButton = () => {
        return (
            <IconButton className="drawer-toggle-button" onClick={this.handleToggleMenu}>
                <ChevronLeftIcon/>
            </IconButton>
        )
    }

    renderOpenButton = () => {
        return (
            <IconButton
                className="drawer-toggle-button"
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleToggleMenu}
                edge="start"
            >
                <MenuIcon />
            </IconButton>
        )
    }
}
  
