import React from 'react'
import messages from '../messages';
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/Search';

import './searchbutton.scss'

const SearchButton = ({
    title=messages.searchButton,
    ...props
}) => {
    const intl = useIntl() 

    return (
        <div className="search-container"
            {...props}
        >
            <div className="search-icon">
              <SearchIcon />
            </div>
            <InputBase
              placeholder={intl.formatMessage(title)}
              /*
              classes={{
                root: "inputRoot",
                input: "inputInput",
              }}
              */
              inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    )
}

SearchButton.propTypes = {
    title: PropTypes.object,
}

export default SearchButton