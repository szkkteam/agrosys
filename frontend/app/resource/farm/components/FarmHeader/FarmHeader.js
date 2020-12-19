import React from 'react'
import Grid from '@material-ui/core/Grid';
import { FormattedMessage } from 'react-intl';

import { BackButton } from 'components/Button'

export default ({
    title,
    children,
    // TODO: Get prop prevUrl to determine where to redirect
    ...props
}) => {

    return (
        <Grid 
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={0}
        >
            <Grid item xs={2}>
                <BackButton 
                    title="Back"
                    redirect='/'
                />
            </Grid>
            <Grid item xs={10}>
                <h2>
                    <FormattedMessage {...title} />
                </h2>
            </Grid>
        </Grid>
    )
}