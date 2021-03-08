import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'
import { useIntl, FormattedMessage } from 'react-intl'

import {
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemIcon,
    Typography,
    Avatar,
    IconButton
} from '@material-ui/core';

const FieldListItemBoundary = ({    
    id,
    className,
    ...props
}) => {
    
    return (
        <ListItemAvatar>
            <Avatar
                variant="square"
                sizes="48px"
                src="https://via.placeholder.com/48/48"
            >

            </Avatar>
        </ListItemAvatar>
    )
}

FieldListItemBoundary.propTypes = {
    disableButton: PropTypes.bool,
    disableAction: PropTypes.bool,
}

export default FieldListItemBoundary