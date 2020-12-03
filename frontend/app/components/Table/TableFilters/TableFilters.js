import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { FormattedMessage } from 'react-intl';

import {
    Typography,
    Button,
    Chip,
} from '@material-ui/core';

import {
    TableFilterChip
} from '../../Table'

import './tablefilters.scss'

const TableFilters = ({
    filters,
    onDelete,
    ...props
}) => {

    const handleDelete = (idToDelete) => () => {
        onDelete && onDelete(idToDelete)
    }

    return (
        <div
            className="table-filter-container"
        >
            <Typography 
                variant="body2"                
            >
                <FormattedMessage {...filters.length? messages.activeFilters: messages.noActiveFilters}/>
            </Typography>
            <ul
                className="filter-list"
            >
                { filters && filters.map((filter, index) => {
                    return (
                        <TableFilterChip
                            key={`filter-${index}`}
                            onDelete={handleDelete(filter.id)}
                            {...filter}
                        />                        
                    )
                }) }
            </ul>
            { filters.length ? 
                <Button
                    className="filter-clearall"
                    color="primary"
                    onClick={handleDelete(undefined)}
                >
                    <FormattedMessage {...messages.clearAll}/>
                </Button> 
            : null }
        </div>        
    )
}

TableFilters.propTypes = {
    filters: PropTypes.array.isRequired,
    onDelete: PropTypes.func,
}

export default TableFilters