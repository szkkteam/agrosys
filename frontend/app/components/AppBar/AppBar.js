import React from 'react'
import classnames from 'classnames'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import { TutorialProgressBar, FarmSelector } from 'farmApp/Tutorial/components'

import './appbar.scss'

/*
className={clsx(classes.menuButton, {
                    [classes.hide]: isDrawerOpen,
                    })}
*/

export default ({
    isDrawerOpen,
    onDrawerOpen,
}) => { 
 
    return (
        <AppBar 
            position="fixed"
            className={classnames('top-appbar',{
                'top-appbar-shift': isDrawerOpen,
            })}
        >
            <Toolbar>
                <IconButton 
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onDrawerOpen}
                    edge="start"
                    className={classnames('menu-button', {
                        hide: isDrawerOpen
                    })}
                >
                <MenuIcon />
                </IconButton>
                <FarmSelector />            
                <div style={{flexGrow: 1}} />
                <div className="">
                    <TutorialProgressBar />
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        //onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                    <AccountCircle />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    )
}