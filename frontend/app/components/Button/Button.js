import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { useFormatTitle } from 'utils/hooks'

import MuiButton from '@material-ui/core/Button';

const Button = forwardRef(({
    title,
    ...props
}, ref) => {

    const formattedTitle = useFormatTitle(title)
    return (
        <MuiButton
            ref={ref}
            {...props}
        >
            {formattedTitle}
      </MuiButton>
    )
})

Button.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    onClick: PropTypes.func,
}

export default Button