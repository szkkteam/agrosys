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

import TableSearch from './TableSearch'
import TableFilter from './TableFilter'

const Spacer = styled.div`
    flex-grow: 1;
`

const FlexToolbar = styled(Toolbar)`
  align-items: flex-start;
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

  componentDidMount() {
    console.debug("Toolbar mounting")
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
        <TableSearch
          value={this.state.searchText}
          onChange={this.onSearchChange}
        />        
      );
    } else {
      return null;
    }
  }
  /*
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
  */


  render() {
    const { 
      innerRef,
      filterProps={}
    } = this.props;
    //console.debug("Toolbar props: ", this.props)

    
    return (
      <FlexToolbar
        ref={innerRef}        
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={8} md={9}>
              <TableFilter
              {...filterProps}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
              {this.renderSearch()}            
          </Grid>
        </Grid>
      </FlexToolbar>
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