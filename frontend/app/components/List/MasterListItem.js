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
    disabled=false,
    index,
    data,
    children,
    ...props
}) => {
  
    const {
        onSelect,
    } = useMasterListContext()

    const handleSelect = () => {
        !disabled && onSelect && onSelect(index, data)
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
    data: PropTypes.any,
    index: PropTypes.number,
    //children: PropTypes.element.isRequired,
}

export default MasterListItem