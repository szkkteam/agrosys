import React from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl';

import Button from '@material-ui/core/Button';

const WorkersAdd = ({
    ...props
}) => {

    return (
        <Button 
            variant="contained"
            color="primary"
            {...props}
        >
            <FormattedMessage {...messages.addTitle} />
        </Button>
    )
}

WorkersAdd.propTypes = {
}

export default WorkersAdd