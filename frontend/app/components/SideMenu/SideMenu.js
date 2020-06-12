import React from 'react'
import classnames from 'classnames'
import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import './sidemenu.scss'

const menuItems = [
    { name: 'fields', label: 'Fields' },
    { name: 'messages', label: 'Messages' },
    { name: 'tasks', label: 'My tasks' },
    { name: 'clients', label: 'Clients' },
]


export default class SideMenu extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        menuOpen: false,
      }
    }


    handleToggleMenu = () => {
        this.setState({ menuOpen: !this.state.menuOpen })
    }

    handleMenuOpen = () => {
        this.setState({ menuOpen: true })
    }

    handleMenuClose = () => {
        this.setState({ menuOpen: false })
    }

    render() {
        const isOpen = this.state.menuOpen;
        return (
            <div>
                <Drawer className={classnames({
                    'drawer': true,
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
                    <div>
                        TODO: user profile
                    </div>
                    <Divider/>
                    <List>
                        {['Fields', 'Messages', 'My tasks', 'Clients'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    <InboxIcon/>
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>                        
                        ))}
                    </List>
                    <Divider/>
                    <List>
                        {['Main Settings', 'Notifications'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    <InboxIcon/>
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </div>
        )
    }

    renderCloseButton = () => {
        return (
            <IconButton onClick={this.handleMenuClose}>
                <ChevronLeftIcon/>
            </IconButton>
        )
    }

    renderOpenButton = () => {
        return (
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleMenuOpen}
                edge="start"
            >
                <MenuIcon />
            </IconButton>
        )
    }
}
  
