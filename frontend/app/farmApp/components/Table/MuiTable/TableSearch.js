/* eslint-disable no-unused-vars */
import classNames from "classnames";
import messages from './messages';
import { useIntl, FormattedMessage } from 'react-intl'
import PropTypes, { oneOf } from "prop-types";
import * as React from "react";
import styled from 'styled-components'

import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

import {
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,

} from '@material-ui/core';

const TableSearch = ({
    value,
    onChange,
    placeholder=messages.searchPlaceholder,
    ...props
}) => {
    const intl = useIntl()

    const handleSearchChange = (e) => {
        onChange && onChange(e.target.value)
    }

    const clearSearch = () => {
        onChange && onChange("")
    }

    return (
        <TextField
          //autoFocus={false}
          fullWidth
          value={value}
          onChange={handleSearchChange}
          placeholder={intl.formatMessage(placeholder)}
          //variant={this.props.searchFieldVariant}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip title={"Search"}>
                  <SearchIcon />
                </Tooltip>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  disabled={!value}
                  onClick={clearSearch}
                >
                  <ClearIcon
                    //fontSize="small"
                    aria-label="clear"
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
    )
}

TableSearch.propTypes = {

}

export default TableSearch