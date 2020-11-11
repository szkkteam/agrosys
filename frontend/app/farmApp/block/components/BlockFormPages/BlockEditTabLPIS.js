import React from 'react'
import { useHistory } from "react-router-dom";
import messages from 'farmApp/farm/messages';
import { useIntl } from 'react-intl'
import * as modalResultTypes from 'site/modalResultTypes';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Field, reduxForm } from 'redux-form'


import { HiddenField, TextField, BooleanField } from 'components/Form'
import { SubmitButton, messages as ButtonMessages } from 'components/Button'
import { LeafletMap } from 'farmApp/map/components'


const BlockEditTabLPIS = ({
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
                <TextField name="cadastralPlot"
                    label="Cadastral Plot"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField name="lpisNumber"
                    label="Mepar Number"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField name="validFrom"
                    label="Valid From"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField name="validTo"
                    label="Valid To"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <BooleanField name="natura2000"
                    label="Natura 2000"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <BooleanField name="nitrateSensitive"
                    label="Nitrate Sensitive"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <BooleanField name="slope"
                    label="12% Slope"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
        </Grid>   
    ) 
}

export default BlockEditTabLPIS