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

import { useTableContext } from '../hooks'

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

const defaultOptions = {
    disableActions: false,

}

const TableHeader = forwardRef(({
    title,
    disableActions=false,
    options={},
    //columns,
    //onColumnChanged,
    ...props
}, ref) => {
    const intl = useIntl()
    const [chipData, setChipData] = useState([
            { id: 0, title: messages.chip1 },
            { id: 1, title: messages.chip2 },
            { id: 2, title: messages.chip3 },
    ])
    
    const {
        toggleColumns: columns,
        onColumnChanged
    } = useTableContext()
    
    const renderColumns = columns && columns.length > 0

    const updatedOptions = {
        ...defaultOptions,
        ...options
    }

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
                { !updatedOptions.disableActions ? <TablePrimaryActionButton
                    title={messages.add}
                />: null }
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
                { renderColumns ? <span style={{borderRight: "2px solid" }}/> : null }
                { renderColumns ? <TableSettingsButton
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
                </TableSettingsButton> : null }
            </div>
        </Grid>
        <Grid item xs={12} >
            <div style={{
                    position: "relative",
                    display: "flex",
                    backgroundColor: "white",
                    padding: "0 10px"
                }}
            >
                <TableFilters
                    filters={chipData}
                    onDelete={handleDelete}
                />                   
                <SearchButton style={{
                    position: "absolute",
                    float: "right",
                    top: "25%",
                    right: "14px",
                }}
                />
            </div>            
        </Grid>
    </Grid>
    )
})

TableHeader.propTypes = {
    title: PropTypes.object.isRequired,
    options: PropTypes.shape({
        disableActions: PropTypes.bool,
    })
}

export default TableHeader