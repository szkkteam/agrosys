import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'

import {
    Drawer,
    Divider,
    IconButton,
    List
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

//<nav className={classnames({ 'menu-open': menuOpen })}>
/*
className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
*/

const PushRight = styled.div`
    display: flex;
    justify-content: flex-end;
`

export default ({
    isDrawerOpen,
    onDrawerClose,
    children,
}) => {

    return (
        <Drawer
            anchor="left"
            open={isDrawerOpen}       
            onClose={onDrawerClose}                 
        >
        <PushRight>            
            <IconButton onClick={onDrawerClose}>
                <CloseIcon />
            </IconButton>
        </PushRight>
        <Divider />
        <List>
            {children}
        </List>
      </Drawer>
    )
}