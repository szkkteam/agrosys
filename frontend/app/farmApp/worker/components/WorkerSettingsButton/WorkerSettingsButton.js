import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl'

import SettingsIcon from '@material-ui/icons/Settings';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Button from '@material-ui/core/Button';

const WorkerSettingsButton = ({

}) => {
    return (
        <Button
            color="primary"
            startIcon={
                <SettingsIcon />
            }
            endIcon={
                <ArrowDropDownIcon />
            }
        >
            Columns
      </Button>
    )
}

WorkerSettingsButton.propTypes = {

}

export default WorkerSettingsButton