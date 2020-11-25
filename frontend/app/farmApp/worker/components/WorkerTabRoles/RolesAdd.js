import React from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl';

import Button from '@material-ui/core/Button';

const RolesAdd = ({
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

RolesAdd.propTypes = {
}

export default RolesAdd