import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { FormattedMessage } from 'react-intl';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';

const PrimaryActionButton = ({
    title,
    onClick,
    Icon=AddCircleIcon,
    ...props
}) => {
    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={
                <Icon />
            }
            onClick={onClick}
            {...props}
        >
            <FormattedMessage {...title} />
      </Button>
    )
}

PrimaryActionButton.propTypes = {
    title: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    Icon: PropTypes.element,
}

export default PrimaryActionButton