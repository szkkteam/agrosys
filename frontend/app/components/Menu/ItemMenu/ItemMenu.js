import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
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

const MenuIconButton = styled(forwardRef(({onClick, icon: Icon = MoreHorizIcon,...props}, ref) => {
    
    const handleClick = (e) => {
        e.stopPropagation()
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
            <Icon />
       </IconButton>                
    )
}))`
    &.MuiIconButton-root {
        padding: 5px;
    }
`

const LinkMenuItem = withLinkComponent(MenuItem)


const ListContainer = forwardRef(({children, ...props}, ref) =>
    <Paper 
        ref={ref}
    >
        {children}
    </Paper>)



const ItemMenu = ({
    icon,
    items,
    ...props
}) => {

    return (
        <Popover
            component={MenuIconButton}
            className="inline-block"
            componentProps={{
                icon
            }}
            {...props}
        >
            <ListContainer>
                { items && items.map((item, i)=> {
                    if ('link' in item) 
                        return (
                            <LinkMenuItem 
                                key={i}
                                {...item.link}
                            >
                                <FormattedMessage {...item.title} />
                            </LinkMenuItem>
                        )
                    else
                        return (
                            <MenuItem 
                                key={i}
                                component='div'
                                onClick={item.onClick}
                            >
                                <FormattedMessage {...item.title} />
                            </MenuItem>
                        )
                }) }
            </ListContainer>
        </Popover>
    )
}

ItemMenu.propTypes = {
    icon: PropTypes.any,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.object.isRequired,
            link: PropTypes.shape({
                to: PropTypes.string,
                params: PropTypes.object,                
            }),
            onClick: PropTypes.func
        })
    )
}

export default ItemMenu