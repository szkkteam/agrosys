import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl, FormattedMessage } from 'react-intl'

import SettingsIcon from '@material-ui/icons/Settings';
import FilterListIcon from '@material-ui/icons/FilterList';

import {
    Grid,
    Typography,
    Chip,
    Button
} from '@material-ui/core';

import { 
    SearchButton,
} from 'components'

import {
    TablePrimaryActionButton,
    TableSettingsButton,
    TableFilters,
    TableSettingsColumn
} from '../../Table'

/*
    Props:
    actions={[
        Icon,
        Text,
        Tooltip,
        onClick(),
        disabled,
    ]} -> default "Add action with plus icon"
    settings={[
        Icon,
        Text,
        Tooltip,
        renderContent() -> return a valid element
        onClick(),
        disabled,
    ]}
    onRemoveFilter(id) -> giving back the filter ID. If ID is null, it means clear all filter
    filters={[
        id,
        Icon,
        Text,
    ]}
    onSearchInput(text) -> gives the free text search input (already debounced)
    children -> a MUI table wrapper which should have the columns property inside.
                it should get the columns property list with titles and show it directly in the columns settings with checkboxes
                if enable/disabled are determined, it should inject the hidden=true into that column
*/

const TableHeader = forwardRef(({
    title,
    columns,
    onColumnChanged,
    ...props
}, ref) => {
    const intl = useIntl()
    const [chipData, setChipData] = useState([
            { id: 0, title: messages.chip1 },
            { id: 1, title: messages.chip2 },
            { id: 2, title: messages.chip3 },
    ])


    const handleDelete = (chipToDelete) => {
        console.log("chipToDelete: ", chipToDelete)
        setChipData((chips) => chips.filter((chip) => chip.id !== chipToDelete));
      };

    return (
        <Grid 
            ref={ref}
            container
            alignItems="center"
            spacing={1}
        >
        <Grid item xs={4}>
            <Typography variant="h6">
                <FormattedMessage {...title} />
            </Typography>
        </Grid>
        <Grid item xs={8}>
            <div style={{float: "right"}}>
                <TablePrimaryActionButton
                    title={messages.add}
                />
                <TableSettingsButton
                    title={messages.filters}
                    Icon={FilterListIcon}
                    componentProps={{
                        style: {
                            marginLeft: "50px",
                            marginRight: "10px",
                        }
                    }}
                />
                <span style={{
                    borderRight: "2px solid"                    
                }}/>
                <TableSettingsButton
                    title={messages.columns}
                    Icon={SettingsIcon}
                    placement="bottom-end"
                    componentProps={{
                        style: {
                            marginLeft: "10px",
                        }
                    }}
                >
                    <TableSettingsColumn
                        onChange={onColumnChanged}
                        columns={columns}
                    />
                </TableSettingsButton>
            </div>
        </Grid>
        <Grid item xs={10}>
            <TableFilters
                filters={chipData}
                onDelete={handleDelete}
            />                   
        </Grid>
        <Grid item xs={2}>
            <div>
                <SearchButton style={{float: "right"}}/>            
            </div>
        </Grid>
    </Grid>
    )
})

TableHeader.propTypes = {
    title: PropTypes.object.isRequired,
}

export default TableHeader