/* eslint-disable no-unused-vars */
import withStyles from "@material-ui/core/styles/withStyles";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import classNames from "classnames";
import messages from './messages';
import { useIntl, FormattedMessage } from 'react-intl'
import PropTypes, { oneOf } from "prop-types";
import "jspdf-autotable";
import * as React from "react";
import styled from 'styled-components'

import {
    Checkbox,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    TextField,
    Tooltip,
    Toolbar,
    Grid,

} from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';

const TableShowColumns = ({

}) => {
    const intl = useIntl()

    return (
        <span>
            <Tooltip title={intl.formatMessage(messages.showColumnsTooltip)}>
                <IconButton
                    color="inherit"
                    onClick={(event) =>
                        this.setState({
                        columnsButtonAnchorEl: event.currentTarget,
                        })
                    }
                    aria-label={this.props.intl.formatMessage(messages.showColumnsTooltip)}
                >
                    <SettingsIcon />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={this.state.columnsButtonAnchorEl}
                open={Boolean(this.state.columnsButtonAnchorEl)}
                onClose={() => this.setState({ columnsButtonAnchorEl: null })}
            >
                <MenuItem
                key={"text"}
                disabled
                style={{
                    opacity: 1,
                    fontWeight: 600,
                    fontSize: 12,
                }}
                >
                    <FormattedMessage {...messages.showColumnsTitle}/>
                </MenuItem>
                {this.props.columns.map((col) => {
                if (!col.hidden || col.hiddenByColumnsButton) {
                    return (
                    <li key={col.tableData.id}>
                        <MenuItem
                        //className={classes.formControlLabel}
                        component="label"
                        htmlFor={`column-toggle-${col.tableData.id}`}
                        disabled={col.removable === false}
                        >
                        <Checkbox
                            checked={!col.hidden}
                            id={`column-toggle-${col.tableData.id}`}
                            onChange={() =>
                            this.props.onColumnsChanged(col, !col.hidden)
                            }
                        />
                        <span>{col.title}</span>
                        </MenuItem>
                    </li>
                    );
                }
                return null;
                })}
            </Menu>
        </span>
    )
  }
