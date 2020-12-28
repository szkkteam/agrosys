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


const BlockTabGeneral = ({
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

BlockTabGeneral.propTypes = {

}

export default BlockTabGeneral