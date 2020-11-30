import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'

import SettingsIcon from '@material-ui/icons/Settings';

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
        <Grid item xs={8}>
            <TablePrimaryActionButton
                title={messages.add}
            />
        </Grid>
        <Grid item xs={4}>
            <div style={{float: "right"}}>
                <TableSettingsButton
                    title={messages.filters}
                    Icon={SettingsIcon}
                />
                <TableSettingsButton
                    title={messages.columns}
                    Icon={SettingsIcon}
                    placement="bottom-end"
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
            <SearchButton style={{float: "right"}}/>
        </Grid>
    </Grid>
    )
})

TableHeader.propTypes = {

}

export default TableHeader