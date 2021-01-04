import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { FormattedMessage } from 'react-intl';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';

const PrimaryActionButton = forwardRef(({
    title,
    Icon=AddCircleIcon,
    ...props
}, ref) => {
    return (
        <Button
            ref={ref}
            variant="contained"
            color="primary"
            startIcon={
                <Icon />
            }
            {...props}
        >
            <FormattedMessage {...title} />
      </Button>
    )
})

PrimaryActionButton.propTypes = {
    title: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    Icon: PropTypes.element,
}

export default PrimaryActionButton