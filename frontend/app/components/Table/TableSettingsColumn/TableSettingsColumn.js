import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl, FormattedMessage } from 'react-intl';

import './tablesettingscolumn.scss'

import {
    List,
    ListItem,
    Checkbox,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Button
 } from '@material-ui/core';

const TableSettingsColumn = ({
    columns,
    onChange,
    ...props
}) => {
    const intl = useIntl()

    const handleColumnChange = (item, newValue) => () => {
        let newArray = [...columns]
        if (item) {
            const index = _.findIndex(columns, {title: item.title})
            newArray.splice(index, 1, {...item, hidden: newValue})
        } else {
            newArray = columns.map(col => ({...col, hidden: newValue}))
        }

        onChange && onChange(newArray)
    }

    return (
        <>
        <List
            className="table-column-list"
            subheader={
                <ListSubheader component="div">
                    <FormattedMessage {...messages.toggleColumns}/>
                </ListSubheader>
            }
        >
            { columns && columns.map((col, index) => {
                const isChecked = !col.hidden
                return (
                    <ListItem 
                        key={`column-list-item-${index}`}
                        role={undefined}
                        dense
                        button
                        onClick={handleColumnChange(col, isChecked)}
                    >                
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={isChecked}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': index }}
                            />
                        </ListItemIcon>
                        <ListItemText 
                            id={index}
                            //primary={intl.formatMessage(col.title)}
                            primary={col.title}
                        />
                    </ListItem>
                )
            })}            
        </List>
        <Button
            color="primary"
            onClick={handleColumnChange(null, false)}
        >
            <FormattedMessage {...messages.selectAll}/>
        </Button>
        </>
    )
}

TableSettingsColumn.propTypes = {
    columns: PropTypes.array.isRequired,
}

export default TableSettingsColumn