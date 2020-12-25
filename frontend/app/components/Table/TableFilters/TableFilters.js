import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components'

import {
    Typography,
    Button,
    Chip,
} from '@material-ui/core';

import {
    TableFilterChip
} from '../../Table'

const Container = styled.div`
    display: flex;
    align-items: center;
    margin: 15px 0;
    height: 36.5px;
`

const List = styled.ul`
    padding-left: 10px;
    margin: 0px;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
`

const ClearButton = styled(Button)`
    text-transform: initial;
`

const TableFilters = ({
    filters,
    onDelete,
    ...props
}) => {

    const handleDelete = (idToDelete) => () => {
        onDelete && onDelete(idToDelete)
    }

    return (
        <Container
        >
            <Typography 
                variant="body2"                
            >
                <FormattedMessage {...filters.length? messages.activeFilters: messages.noActiveFilters}/>
            </Typography>
            <List>
                { filters && filters.map((filter, index) => {
                    return (
                        <TableFilterChip
                            key={`filter-${index}`}
                            onDelete={handleDelete(filter.id)}
                            {...filter}
                        />                        
                    )
                }) }
            </List>
            { filters.length ? 
                <ClearButton
                    color="primary"
                    onClick={handleDelete(undefined)}
                >
                    <FormattedMessage {...messages.clearAll}/>
                </ClearButton> 
            : null }
        </Container>        
    )
}

TableFilters.propTypes = {
    filters: PropTypes.array.isRequired,
    onDelete: PropTypes.func,
}

export default TableFilters