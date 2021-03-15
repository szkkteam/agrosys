import React, { forwardRef, useEffect, useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { withLinkComponent } from 'utils/hoc'
import { spacing } from '@material-ui/system'
import sizeMe, { SizeMe } from 'react-sizeme'

import {
    AppBar as MuiAppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Avatar
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
    ${({theme}) => `
        z-index: 1300;
        box-shadow: none;
        transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms,margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;

        .MuiToolbar-root {
            padding-left: 15px;
        }
        margin-left: 0px;
        width: 100%;
        ${theme.breakpoints.up('navRailHide')} {
            margin-left: ${theme.custom.navrailWidth}px;
            width: calc(100% - ${theme.custom.navrailWidth}px);
        }
    `}
`

const ToolbarFlexEnd = styled(Toolbar)`
    ${({theme}) => `
        align-items: center;        
        ${theme.breakpoints.down('sm')} {
            padding-top: ${theme.spacing(1)}px;
            align-items: flex-start;    
            min-height: 128px;
        }
    `}
    //align-items: flex-end;

`

// TODO: +2px because 64-8 looks not enough
const ContentSpacer = styled(({height: dummy = null, ...rest}) => <div {...rest}/> )`
    ${({ theme, height }) => `
      height: calc(${height}px - ${theme.custom.pagePadding}px);
      min-height: calc(${height}px - ${theme.custom.pagePadding}px);
      display: flex;
      align-items: center;
    `}
`

const PageTitle = styled(Typography)`
    ${({theme}) => `
        //margin: auto;
        font-size: 1.5rem;
        width: calc(350px - ${theme.spacing(2)}px);
    `}
`

const TabContainer = styled.div`
    ${({theme}) => `
    ${theme.breakpoints.down('sm')} {
        align-self: flex-end;    
    }
    `}
`

const CenterAlign = styled.div`
    //margin: auto;
`

const FlexNoWrap = styled.div`
    //margin: auto;
    display: flex;
    flex-wrap: nowrap;
`

const AvatarIcon = styled(Avatar)`
    ${({theme}) => `
        width: 32px;
        height: 32px;
    `}
`

const AccountMenuItem = styled(Button)`
    ${spacing}
    & p {
        text-transform: initial;
    }
    
`

const IconWrapper = styled.div`${spacing}`

const AppBar = forwardRef(({
    title,
    goUpRoute,
    children,
}, ref) => { 

/*
  useEffect(() => {
    console.debug("appbar - mount")
    return () => {
      //console.debug("appbar - un-mount")
    }
  }, [])
  */
    const appTitle = typeof(title) === 'object' ?
    (
        <FormattedMessage {...title} />
    ) : title


    return (
        <SizeMe monitorHeight noPlaceholder>
            {({ size }) => 
                <>
                    <StyledAppBar 
                        ref={ref}
                        position="fixed"
                    >
                        <ToolbarFlexEnd>
                                <CenterAlign>
                                    { goUpRoute &&
                                        <BackButtonLink {...goUpRoute} />
                                    }
                                </CenterAlign>  
                                <PageTitle variant="h1">
                                    {appTitle}
                                </PageTitle>
                                <TabContainer>
                                    {children}
                                </TabContainer>
                            <div style={{flexGrow: 1}} />
                            <FlexNoWrap>
                                <NotificationButton />
                                <AccountMenuItem
                                    ml={2}
                                    color="inherit"
                                    startIcon={
                                        <AvatarIcon></AvatarIcon>
                                    }
                                >
                                    
                                    <Typography variant="body2" color="inherit">
                                        user@user.com
                                    </Typography>
                                </AccountMenuItem>
                            </FlexNoWrap>
                        </ToolbarFlexEnd>
                    </StyledAppBar>
                    <ContentSpacer height={size.height} />
                </>
            }
        </SizeMe>
        
    )
})
/*
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
                    <TutorialProgressBar />
*/

AppBar.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.element,
    ]),
    goUpRoute: PropTypes.shape({
        to: PropTypes.string.isRequired
    }),
}

export default React.memo(AppBar)