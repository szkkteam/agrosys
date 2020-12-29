import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useIntl } from 'react-intl'
import messages from './messages';

import {
    Grid
} from '@material-ui/core';

import { 
    HiddenField,
    TextField
} from 'components/Form'


const FieldTabGeneral = ({
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
                    label="Parcel title"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField name="area"
                    label="Used area"
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
            <Grid item xs={12}>
                <TextField name="tableNumber"
                    label="Table number"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField name="notes"
                    label="Notes"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            
        </Grid>   
    ) 
}

FieldTabGeneral.propTypes = {

}

export default FieldTabGeneral