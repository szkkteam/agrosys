/* eslint-disable no-unused-vars */
import withStyles from "@material-ui/core/styles/withStyles";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import classNames from "classnames";
import messages from './messages';
import { injectIntl, FormattedMessage } from 'react-intl'
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

import { 
    SearchButton,
} from 'components'

import SettingsIcon from '@material-ui/icons/Settings';
import FilterListIcon from '@material-ui/icons/FilterList';
import MoreVertIcon from '@material-ui/icons/MoreVert';
/*
import {
    TablePrimaryActionButton,
    TableSettingsButton,
    TableFilters,
    TableSettingsColumn
} from '../../Table'
*/
import ToolbarTitle from '../ToolbarTitle'
import TablePrimaryActionButton from '../TablePrimaryActionButton'
import TableFilters from '../TableFilters'

const Spacer = styled.div`
    flex-grow: 1;
`

export class MTableToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsButtonAnchorEl: null,
      exportButtonAnchorEl: null,
      searchText: props.searchText,
    };
  }

  onSearchChange = (searchText) => {
    this.props.dataManager.changeSearchText(searchText);
    this.setState({ searchText }, this.props.onSearchChanged(searchText));
  };

  renderSearch() {
    const localization = {
      ...MTableToolbar.defaultProps.localization,
      ...this.props.localization,
    };
    if (this.props.search) {
      return (
        <TextField
          autoFocus={this.props.searchAutoFocus}
          value={this.state.searchText}
          onChange={(event) => this.onSearchChange(event.target.value)}
          placeholder={localization.searchPlaceholder}
          variant={this.props.searchFieldVariant}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip title={localization.searchTooltip}>
                  <this.props.icons.Search fontSize="small" />
                </Tooltip>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  disabled={!this.state.searchText}
                  onClick={() => this.onSearchChange("")}
                  aria-label={localization.clearSearchAriaLabel}
                >
                  <this.props.icons.ResetSearch
                    fontSize="small"
                    aria-label="clear"
                  />
                </IconButton>
              </InputAdornment>
            ),
            style: this.props.searchFieldStyle,
            inputProps: {
              "aria-label": localization.searchAriaLabel,
            },
          }}
        />
      );
    } else {
      return null;
    }
  }

  renderShowColumns() {

    return (
        <span>
            <Tooltip title={this.props.intl.formatMessage(messages.showColumnsTooltip)}>
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
/*
  renderDefaultActions() {
    const localization = {
      ...MTableToolbar.defaultProps.localization,
      ...this.props.localization,
    };
    const { classes } = this.props;

    return (
      <div>               
        <span>
          <this.props.components.Actions
            actions={
              this.props.actions &&
              this.props.actions.filter((a) => a.position === "toolbar")
            }
            components={this.props.components}
          />
        </span>
      </div>
    );
  }

  renderSelectedActions() {
    return (
      <React.Fragment>
        <this.props.components.Actions
          actions={this.props.actions.filter(
            (a) => a.position === "toolbarOnSelect"
          )}
          data={this.props.selectedRows}
          components={this.props.components}
        />
      </React.Fragment>
    );
  }

  renderActions() {
    const { classes } = this.props;

    return (
      <div className={classes.actions}>
        <div>
          {this.props.selectedRows && this.props.selectedRows.length > 0
            ? this.renderSelectedActions()
            : this.renderDefaultActions()}
        </div>
      </div>
    );
  }
*/
  render() {
    const { innerRef } = this.props;
    //console.debug("Toolbar props: ", this.props)

    const chipData = [
        { id: 0, title: messages.chip1 },
        { id: 1, title: messages.chip2 },
        { id: 2, title: messages.chip3 },
    ]
    
    return (
      <Toolbar
        ref={innerRef}        
      >
        <TableFilters
            filters={chipData}
            onDelete={() => null}
        />  
        <Spacer />
        <div>
            {this.renderSearch()}
            <IconButton>
                <FilterListIcon />
            </IconButton>
            {this.renderShowColumns()}
            <IconButton>
                <MoreVertIcon />
            </IconButton>
        </div>
      </Toolbar>
    );
  }
}


MTableToolbar.defaultProps = {
  actions: [],
  columns: [],
  columnsButton: false,
  localization: {
    addRemoveColumns: "Add or remove columns",
    nRowsSelected: "{0} row(s) selected",
    showColumnsTitle: "Show Columns",
    showColumnsAriaLabel: "Show Columns",
    exportTitle: "Export",
    exportAriaLabel: "Export",
    exportCSVName: "Export as CSV",
    exportPDFName: "Export as PDF",
    searchTooltip: "Search",
    searchPlaceholder: "Search",
    searchAriaLabel: "Search",
    clearSearchAriaLabel: "Clear Search",
  },
  search: true,
  showTitle: true,
  searchText: "",
  showTextRowsSelected: true,
  toolbarButtonAlignment: "right",
  searchAutoFocus: false,
  searchFieldAlignment: "right",
  searchFieldVariant: "standard",
  selectedRows: [],
  title: "No Title!",
};

MTableToolbar.propTypes = {
  actions: PropTypes.array,
  columns: PropTypes.array,
  columnsButton: PropTypes.bool,
  components: PropTypes.object.isRequired,
  getFieldValue: PropTypes.func.isRequired,
  localization: PropTypes.object.isRequired,
  onColumnsChanged: PropTypes.func.isRequired,
  dataManager: PropTypes.object.isRequired,
  searchText: PropTypes.string,
  onSearchChanged: PropTypes.func.isRequired,
  search: PropTypes.bool.isRequired,
  searchFieldStyle: PropTypes.object,
  searchFieldVariant: PropTypes.string,
  selectedRows: PropTypes.array,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  showTitle: PropTypes.bool.isRequired,
  showTextRowsSelected: PropTypes.bool.isRequired,
  toolbarButtonAlignment: PropTypes.string.isRequired,
  searchFieldAlignment: PropTypes.string.isRequired,
  renderData: PropTypes.array,
  data: PropTypes.array,
  exportAllData: PropTypes.bool,
  exportButton: PropTypes.bool,
  exportDelimiter: PropTypes.string,
  exportFileName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  exportCsv: PropTypes.func,
  exportPdf: PropTypes.func,
  searchAutoFocus: PropTypes.bool,
};

const TableToolbar = injectIntl(MTableToolbar)

export default React.forwardRef((props, ref) => <TableToolbar innerRef={ref} {...props} />)