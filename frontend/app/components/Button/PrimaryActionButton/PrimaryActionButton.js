import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { useFormatTitle } from 'utils/hooks'

import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';

const PrimaryActionButton = forwardRef(({
    title,
    Icon=AddCircleIcon,
    ...props
}, ref) => {

    const formattedTitle = useFormatTitle(title)
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
            {formattedTitle}
      </Button>
    )
})

PrimaryActionButton.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    onClick: PropTypes.func,
    Icon: PropTypes.element,
}

export default PrimaryActionButton