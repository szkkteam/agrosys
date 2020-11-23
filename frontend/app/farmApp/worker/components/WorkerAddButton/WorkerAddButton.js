import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl';

import Button from '@material-ui/core/Button';

const WorkerAddButton = ({
    title
}) => {

    return (
        <Button 
            style={{float: "right", marginRight: "15px"}}
            variant="contained"
            color="primary"
        >
            <FormattedMessage {...title} />
        </Button>
    )
}

WorkerAddButton.propTypes = {
    title: PropTypes.object.isRequired,
}

export default WorkerAddButton