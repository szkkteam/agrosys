import React, { forwardRef, useEffect, useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { withLinkComponent } from 'utils/hoc'
import sizeMe, { SizeMe } from 'react-sizeme'

import {
    AppBar as MuiAppBar,
    Toolbar,
    IconButton,
    Typography
} from '@material-ui/core';

import BackButton from 'components/Button/BackButton'
const BackButtonLink = withLinkComponent(BackButton)

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
/*
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
*/

import { TutorialProgressBar } from 'farmApp/tutorial/components'
import { NotificationButton } from 'farmApp/notification/components'

const StyledAppBar = styled(MuiAppBar)`
    ${({ theme }) => `
        z-index: 1300;
        box-shadow: none;
        width: calc(100% - ${theme.custom.navrailWidth}px);
        margin-left: ${theme.custom.navrailWidth}px;
        transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms,margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;

        .MuiToolbar-root {
            padding-left: 15px;
        }
    `}
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
// TODO: +2px because 64-8 looks not enough
const ContentSpacer = styled(({height: dummy = null, ...rest}) => <div {...rest}/> )`
    ${({ theme, height }) => `
      height: calc(${height}px - ${theme.custom.pagePadding}px);
      display: flex;
      align-items: center;
    `}
`

const PageTitle = styled(Typography)`
    min-width: 200px;
    font-size: 1.5rem;
`


const AppBar = forwardRef(({
    title,
    goUpRoute,
    children,
}, ref) => { 


  useEffect(() => {
    console.debug("appbar - mount")
    return () => {
      //console.debug("appbar - un-mount")
    }
  }, [])

    return (
        <SizeMe monitorHeight noPlaceholder>
            {({ size }) => 
                <>
                    <StyledAppBar 
                        ref={ref}
                        position="fixed"
                    >
                        <Toolbar>               
                            <div>
                                { goUpRoute &&
                                    <BackButtonLink {...goUpRoute} />
                                }
                            </div>  
                            <PageTitle variant="h1">
                                {title? <FormattedMessage {...title} /> : null }
                            </PageTitle>
                            <div>
                                {children}
                            </div>
                            <div style={{flexGrow: 1}} />
                            <div className="">
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
                    <ContentSpacer height={size.height} />
                </>
            }
        </SizeMe>
        
    )
})
/*
                    <TutorialProgressBar />
*/

AppBar.propTypes = {
    title: PropTypes.object,
    goUpRoute: PropTypes.shape({
        to: PropTypes.string.isRequired
    }),
}

export default React.memo(AppBar)