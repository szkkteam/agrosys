import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { 
    HiddenField,
    TextField,
    Divider,
} from 'components/Form'

import {
    Typography,
    Grid,
} from '@material-ui/core'


const MachineryTabGeneral = ({
    title,

}) => {
    return (
            <Grid
                container
                spacing={1}
            >
                <Grid item xs={12}>
                    <Typography variant="h6">
                        <FormattedMessage {...title} />
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid item xs={6}>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid item xs={12}>
                                    <TextField name="title"
                                        label="Name"
                                        variant="outlined"
                                        formProps={{fullWidth: true}}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="licensePlate"
                                        label="License plate"
                                        variant="outlined"
                                        formProps={{fullWidth: true}}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="year"
                                        label="Model year"
                                        variant="outlined"
                                        formProps={{fullWidth: true}}
                                    />                                    
                                    </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid item xs={12}>
                                    <TextField name="type"
                                        label="Model type"
                                        variant="outlined"
                                        formProps={{fullWidth: true}}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="manufacturer"
                                        label="Manufacturer"
                                        variant="outlined"
                                        formProps={{fullWidth: true}}
                                    />                                    
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider />
                <Grid item xs={12}>
                    Notes
                </Grid>
            </Grid>
    )
}

MachineryTabGeneral.propTypes = {

}

export default MachineryTabGeneral