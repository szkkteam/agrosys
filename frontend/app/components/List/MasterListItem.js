import React, { useContext, useRef, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useRouteMatch, useHistory } from "react-router-dom";
import { useIntl, FormattedMessage } from 'react-intl'

import useMasterListContext from './useMasterListContext'

import {
    ListItem,    
} from '@material-ui/core';

const MasterListItem = ({
    data,
    children,
    ...props
}) => {

    const {
        onSelect,
    } = useMasterListContext()

    const handleSelect = () => {
        onSelect && onSelect(data)
    }

    return (
        <ListItem
            //button
            onClick={handleSelect}   
            {...props}         
        >
            {children}
        </ListItem>
    )
}

MasterListItem.propTypes = {
    data: PropTypes.object,
    children: PropTypes.element.isRequired,
}

export default MasterListItem