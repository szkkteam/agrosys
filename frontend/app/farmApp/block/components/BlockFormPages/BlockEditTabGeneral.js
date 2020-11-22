import React from 'react'
import { useHistory } from "react-router-dom";
import messages from 'farmApp/farm/messages';
import { useIntl } from 'react-intl'
import * as modalResultTypes from 'site/modalResultTypes';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Field, reduxForm } from 'redux-form'


import { HiddenField, TextField, onlyDecimal } from 'components/Form'
import { SubmitButton, messages as ButtonMessages } from 'components/Button'
import { LeafletMap } from 'farmApp/map/components'


const BlockEditTabGeneral = ({
    invalid,
    handleSubmit,
    submitting,
    pristine,
    action,
    dirty,
    change,
    tasks,
    onBack,
    onComplete,
    ...rest 
}) => {

    const intl = useIntl()

    return (      
        <Grid
            container
            spacing={2}
        >
            <Grid item xs={12}>
                <TextField name="title"
                    label="Block title"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField name="location"
                    label="Location"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField name="area"
                    label="Usable area"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField name="soilType"
                    label="Soil Type"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField name="agriculturalType"
                    label="Agricultural Type"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField name="ownership"
                    label="Ownership"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
        </Grid>   
    ) 
}

export default BlockEditTabGeneral