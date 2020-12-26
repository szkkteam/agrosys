import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages'
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom'
import { ROUTES } from 'routes'

import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';

import { withLinkComponent } from 'utils/hoc'

const LinkButton = withLinkComponent(Button)

const FieldCreateButton = forwardRef(({
    customRef,
    onClick,
    pushModalWindow,
    ...props
}, ref) => {

    const params = useParams()

    return (
        <LinkButton
            ref={ref}
            to={ROUTES.FieldCreateDraw}
            params={params}
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            {...props}
        >
            <FormattedMessage {...messages.title} />
        </LinkButton>
    )
})

FieldCreateButton.propTypes = {
    
}

export default FieldCreateButton
