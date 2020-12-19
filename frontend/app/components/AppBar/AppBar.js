import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'

import {
    AppBar as MuiAppBar,
    Toolbar,
    IconButton,
    Typography
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
/*
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
*/

import { TutorialProgressBar } from 'farmApp/tutorial/components'
import { FarmSelector } from 'farmApp/farm/components'
import { ProductionTopSelector } from 'farmApp/production/components'
import { NotificationButton } from 'farmApp/notification/components'

const StyledAppBar = styled(MuiAppBar)`
    z-index: 1300;
    box-shadow: none;
    transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms,margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;

    .MuiToolbar-root {
        padding-left: 15px;
    }

`

const MenuButton = styled(IconButton)`
    margin-right: 10px;
    margin-left: -2px;
`

const TabContent = styled.div`
    height: 64px;
    display: flex;
    align-items: center;
    > div {
        height: 100%;
        align-items: center;
        > div {
            height: 100%;
            align-items: center;
            display: flex;
        }
    }
`

const PageTitle = styled(Typography)`
    width: 200px;
    font-size: 1.5rem;
`

/*
className={clsx(classes.menuButton, {
                    [classes.hide]: isDrawerOpen,
                    })}
*/

const AppBar = forwardRef(({
    title,
    appTabRef,
    isDrawerOpen,
    onDrawerOpen,
}, ref) => { 
 
    return (
        <StyledAppBar 
            ref={ref}
            position="fixed"
        >
            <Toolbar>
                <MenuButton                     
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onDrawerOpen}
                    edge="start"
                >
                    <MenuIcon />
                </MenuButton>    
                <PageTitle variant="h1">
                    {title? <FormattedMessage {...title} /> : null }
                </PageTitle>
                <TabContent ref={appTabRef}>

                </TabContent>
                <div style={{flexGrow: 1}} />
                <div className="">
                    <TutorialProgressBar />
                    <NotificationButton />
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
        </StyledAppBar>
    )
})

AppBar.propTypes = {
    title: PropTypes.object,
}

export default AppBar