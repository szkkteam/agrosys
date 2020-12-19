import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'

import AndroidIcon from '@material-ui/icons/Android';
import {
    Drawer,
    Divider,
    IconButton,
    List
} from '@material-ui/core';

const FixedDrawer = styled(Drawer)`
    ${({ theme }) => `
        flex-shrink: 0;
        white-space: nowrap;
        width: ${theme.custom.navrailWidth}px;
        overflow-x: hidden;

        .MuiPaper-root {
            width: ${theme.custom.navrailWidth}px;
            overflow-x: hidden;
        }
    `}
    
`

const Toolbar = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 8px;
    min-height: 64px;
`

export default ({
    children,
}) => {

    return (
        <FixedDrawer
            variant="permanent"                    
        >   
            <Toolbar>
                <IconButton>
                    <AndroidIcon />
                </IconButton>
            </Toolbar>     
            <List>
                {children}
            </List>
      </FixedDrawer>
    )
}