import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import './submitbutton.scss'

const SubmitButton = ({
    disabled=false,
    submitTitle,    
    cancelTitle,
    submitDisabled=false,
    cancelDisabled=false,
    onCancel,
    onSubmit=null,
    className,
}) => {
    
    const submitProps = onSubmit? { onClick: onSubmit } : { type: 'submit'}

    return (
        <div className="btn-container">
            <Grid 
                container
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={6}>
                    <Button 
                        disabled={disabled || cancelDisabled}
                        variant="contained"
                        color="primary"
                        onClick={onCancel}
                        className={className}
                    >
                        <FormattedMessage {...cancelTitle} />
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        disabled={disabled || submitDisabled}
                        variant="contained"
                        color="primary"
                        className={className}
                        {...submitProps}
                        //onClick={onComplete}
                    >
                        <FormattedMessage {...submitTitle} />
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

SubmitButton.propTypes = {
    disabled: PropTypes.bool,
    submitTitle: PropTypes.object.isRequired,
    cancelTitle: PropTypes.object.isRequired,
    submitDisabled: PropTypes.bool,
    cancelDisabled: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    className: PropTypes.string,
}

export default SubmitButton