import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl';

import {
    Chip,
} from '@material-ui/core';

import './tablefilterchip.scss'

const TableFilterChip = ({
    id,
    title,
    onDelete,
    component,
    ...props
}) => {
    const intl = useIntl()

    const Component = component? component : 'li'

    return (
        <Component 
            className="filter-chip"
        >
            <Chip
                label={intl.formatMessage(title)}  
                onDelete={onDelete}           
                {...props}                   
            />
        </Component>
    )
}

TableFilterChip.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.object.isRequired,
    onDelete: PropTypes.func,
    component: PropTypes.element,
}

export default TableFilterChip