import React from 'react'
import { FormattedMessage } from 'react-intl';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import './submitbutton.scss'

export default ({
    disabled=false,
    submitTitle,
    cancelTitle,
    submitDisabled=false,
    cancelDisabled=false,
    onCancel,
    onSubmit=null,
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
                    >
                        <FormattedMessage {...cancelTitle} />
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        disabled={disabled || submitDisabled}
                        variant="contained"
                        color="primary"
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