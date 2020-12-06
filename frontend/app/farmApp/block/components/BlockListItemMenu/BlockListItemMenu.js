import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { ROUTES } from 'routes'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { withLinkComponent } from 'utils/hoc'

import { Popover } from 'components'
import {
    MenuItem,
    IconButton,
    Paper
} from '@material-ui/core';

const MenuIconButton = styled(forwardRef(({onClick, ...props}, ref) => {
    
    const handleClick = (e) => {
        e.preventDefault()
        onClick && onClick(e)
    }

    return (
        <IconButton
            ref={ref}                    
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={handleClick}
            {...props}
        >
            <MoreHorizIcon />
       </IconButton>                
    )
}))`
    &.MuiIconButton-root {
        padding: 5px;
    }
`

const LinkMenuItem = withLinkComponent(MenuItem)

const ListContainer = forwardRef(({id, ...props}, ref) =>
    <Paper 
        ref={ref}
    >
        <LinkMenuItem 
            to={ROUTES.BlockDetail}
            params={{id}}
        >
            <FormattedMessage {...messages.edit} />
        </LinkMenuItem>
        <MenuItem 
            component='div'
            onClick={null}
        >
            <FormattedMessage {...messages.delete} />
        </MenuItem>
    </Paper>)



const BlockListItemMenu = ({
    ...props
}) => {
    
    const id = "1"

    return (
        <Popover
            component={MenuIconButton}
            className="inline-block"
            {...props}
        >
            <ListContainer
                id={id}
            />
        </Popover>
    )
}

BlockListItemMenu.propTypes = {

}

export default BlockListItemMenu