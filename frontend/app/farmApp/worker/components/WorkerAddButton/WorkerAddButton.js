import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl'

import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';

const WorkerAddButton = ({

}) => {
    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={
                <AddCircleIcon />
            }
        >
            Add new
      </Button>
    )
}

WorkerAddButton.propTypes = {

}

export default WorkerAddButton