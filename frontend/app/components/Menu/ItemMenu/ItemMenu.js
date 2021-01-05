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


const ListContainer = forwardRef(({items, data, onClose, ...props}, ref) =>
    <Paper 
        ref={ref}
    >
        { items && items.map((item, i)=> {

            const handleClick = (localItem, param) => (e) => {
                localItem.onClick && localItem.onClick(e, param)
                onClose(e)
            }

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
                        onClick={handleClick(item, data)}
                    >
                        <FormattedMessage {...item.title} />
                    </MenuItem>
                )
        }) }
    </Paper>)


const ItemMenu = ({
    icon,
    items,
    data,
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
            <ListContainer
                items={items}
                data={data}
            />
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
    ),
    data: PropTypes.object,
}

export default ItemMenu