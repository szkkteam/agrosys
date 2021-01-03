import React, { useRef, useMemo, useLayoutEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
    Grid
} from '@material-ui/core'

import { PrimaryActionButton } from 'components'


import { Popover } from 'components'
import {
    MenuItem,
    IconButton,
    Paper
} from '@material-ui/core';

const ListContainer = forwardRef(({children, ...props}, ref) =>
    <Paper 
        ref={ref}
    >
        {children}
    </Paper>)



const DashboardAddWidget = ({
    items,
    onAdd,
    ...props
}) => {
    const intl = useIntl()

    const handleClick = (key) => () => {
        onAdd && onAdd(key)
    }

    return (
        <Popover
            component={PrimaryActionButton}
            className="inline-block"
            componentProps={{
                title: messages.addNewTitle,
                disabled: !items.length
            }}
            {...props}
        >
            <ListContainer>
                { items && items.map((item, i)=> (
                    <MenuItem 
                        key={i}
                        component='div'
                        onClick={handleClick(item.key)}
                    >
                        {item.label}
                    </MenuItem>
                ))}                    
            </ListContainer>
        </Popover>
    )
}

DashboardAddWidget.propTypes = {
    
}

export default DashboardAddWidget